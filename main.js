// Initial value tabel
let tableBsc = [];
let tableFls = [];


// Nilai percepatan gravitasi (konstan)
const g = 9.8


// Fungsi f(x)
function f(x) {
    // Mengambil nilai c, v, dan t dari inputan user
    let c = Number(document.getElementById('c').value);
    let v = Number(document.getElementById('v').value);
    let t = Number(document.getElementById('t').value);

    return (((g * x) / c) * (1 - Math.E**(-(c / x) * t))) - v;
}


// Bisection Algorithm
function bisection(xl, xu, es) {
    let iter = 1;
    let condition = true;

    while (condition) {
        let xr = (xl + xu)/2;
        let data = {
            'iteration': iter,
            'xl': xl,
            'f(xl)': f(xl),
            'xu': xu,
            'f(xu)': f(xu),
            'xr': xr,
            'f(xr)': f(xr),
        };

        let ea = 0;

        if (f(xl) * f(xr) < 0) {
            ea = Math.abs(((xr - xu)/xr)*100);
            xu = xr;
        } else if (f(xl) * f(xr) > 0) {
            ea = Math.abs(((xr - xl)/xr)*100);
            xl = xr;
        } else {
            ea = 0;
        }
        
        data.ea = ea;
        tableBsc.push(data);
        document.getElementById('massa-bsc').innerHTML = `<p>Massa = ${xr}</p>`;

        iter = iter + 1;
        condition = ea > es;
    }
}


// False-position Algorithm
function falsePosition(xl, xu, es) {
    let iter = 1;
    let condition = true;

    while (condition) {
        let xr = xu - ((f(xu)*(xl - xu))/(f(xl)-f(xu)));
        let data = {
            'iteration': iter,
            'xl': xl,
            'f(xl)': f(xl),
            'xu': xu,
            'f(xu)': f(xu),
            'xr': xr,
            'f(xr)': f(xr),
        };

        let ea = 0;

        if (f(xl) * f(xr) < 0) {
            ea = Math.abs(((xr - xu)/xr)*100);
            xu = xr;
        } else if (f(xl) * f(xr) > 0) {
            ea = Math.abs(((xr - xl)/xr)*100);
            xl = xr;
        } else {
            ea = 0;
        }
        
        data.ea = ea;
        tableFls.push(data);
        document.getElementById('massa-fls').innerHTML = `<p>Massa = ${xr}</p>`;

        iter = iter + 1;
        condition = ea > es;
    }
}


// Fungsi untuk menerima dan mengecek inputan tebakan dari user
function inputGuess(method){
    let xl = Number(document.getElementById('xl').value);
    let xu = Number(document.getElementById('xu').value);
    let es = Number(document.getElementById('es').value);

    document.getElementById('fx-value').innerHTML = 
        `<p>f(xl) = ${f(xl)}</p>` +
        `<p>f(xu) = ${f(xu)}</p>`

    // Mengecek apakah tebakan yang dimasukkan memenuhi syarat, jika ya jalankan metode bisection / false-position
    if (f(xl) * f(xu) >= 0.0 || c === 0 ||t === 0) {
        document.getElementById('message').innerHTML = 
            "<p>Tebakan yang anda masukkan tidak memenuhi syarat.</p>" +
            "<p>Silahkan masukkan tebakan lain.</p>";
        alert("Tebakan yang anda masukkan tidak memenuhi syarat.\nSilahkan masukkan tebakan lain.")
    } else {
        console.log(f(xl))
        document.getElementById('message').innerHTML = "<p>Tebakan anda memenuhi syarat.</p>";
        method(xl,xu,es);
    }
}


// Menampilkan tabel untuk perhitungan menggunakan bisection algorithm
function generateTableBsc() {
    // Menghapus perhitungan sebelumnya jika ada
    if (tableBsc.length > 0) {
        tableBsc.length = 0;
        document.getElementById('massa-bsc').innerHTML = "";
    }

    // Memanggil fungsi untuk mendapatkan input user dan menghitungnya menggunakan False-position method
    inputGuess(bisection);

    // Membuat tabel perhitungan
    let k = '<tbody>'
    for(let i = 0;i < tableBsc.length; i++){
        k+= '<tr>';
        k+= '<td>' + tableBsc[i]['iteration'] + '</td>';
        k+= '<td>' + tableBsc[i]['xl'] + '</td>';
        k+= '<td>' + tableBsc[i]['f(xl)'] + '</td>';
        k+= '<td>' + tableBsc[i]['xu'] + '</td>';
        k+= '<td>' + tableBsc[i]['f(xu)'] + '</td>';
        k+= '<td>' + tableBsc[i]['xr'] + '</td>';
        k+= '<td>' + tableBsc[i]['f(xr)'] + '</td>';
        k+= '<td>' + tableBsc[i]['ea'] + '</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tableDataBsc').innerHTML = k;
}


// Menampilkan tabel untuk perhitungan menggunakan false-position algorithm
function generateTableFls() {
    // Menghapus perhitungan sebelumnya jika ada
    if (tableFls.length > 0) {
        tableFls.length = 0;
        document.getElementById('massa-fls').innerHTML = "";
    }
    
    // Memanggil fungsi untuk mendapatkan input user dan menghitungnya menggunakan False-position method
    inputGuess(falsePosition);

    // Membuat tabel perhitungan
    let k = '<tbody>'
    for(let i = 0;i < tableFls.length; i++){
        k+= '<tr>';
        k+= '<td>' + tableFls[i]['iteration'] + '</td>';
        k+= '<td>' + tableFls[i]['xl'] + '</td>';
        k+= '<td>' + tableFls[i]['f(xl)'] + '</td>';
        k+= '<td>' + tableFls[i]['xu'] + '</td>';
        k+= '<td>' + tableFls[i]['f(xu)'] + '</td>';
        k+= '<td>' + tableFls[i]['xr'] + '</td>';
        k+= '<td>' + tableFls[i]['f(xr)'] + '</td>';
        k+= '<td>' + tableFls[i]['ea'] + '</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tableDataFls').innerHTML = k;
}
