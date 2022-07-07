module.exports = [
{   
    verbo: 'chover',
    modo: 'INDICATIVO',
    tempo: 'PRESENTE',
    verbosEsperados: [
        null,
        null,
        'chove',
        null,
        null,
        'chovem'
    ]
},
{   
    verbo: 'chover',
    modo: null,
    tempo: 'PARTICIPIO_PASSADO',
    verbosEsperados: [
        'chovido',
        'chovida',
        'chovidos',
        'chovidas'
    ]
}
];