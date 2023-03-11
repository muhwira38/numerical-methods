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
        console.log(iter, xl, f(xl), xu, f(xu), xr, f(xr))

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
        console.log(iter, xl, f(xl), xu, f(xu), xr, f(xr))

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

        iter = iter + 1;
        condition = ea > es;
    }
}


// Fungsi menampilkan tabel untuk perhitungan menggunakan bisection algorithm
function generateTableBsc() {

    // Menghapus isi dari tabel perhitungan bisection method jika terdapat value di dalamnya
    if (tableBsc.length > 0) {
        tableBsc.length = 0
    }

    let xl = Number(document.getElementById('xl').value);
    let xu = Number(document.getElementById('xu').value);
    let es = Number(document.getElementById('es').value);

    bisection(xl, xu, es);

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

// Fungsi menampilkan tabel untuk perhitungan menggunakan false-position algorithm
function generateTableFls() {

    // Menghapus isi dari tabel perhitungan false-position method jika terdapat value di dalamnya
    if (tableFls.length > 0) {
        tableFls.length = 0
    }
    
    // Mengambil nilai xl, xu, dan es dari inputan user
    let xl = Number(document.getElementById('xl').value);
    let xu = Number(document.getElementById('xu').value);
    let es = Number(document.getElementById('es').value);

    falsePosition(xl, xu, es);

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