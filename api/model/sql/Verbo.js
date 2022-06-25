module.exports.selectVerbos = 
    ' SELECT ' +
    '   V.DESCRICAO as descricao, ' +
    '   V.CODIGO as codigo ' +
    ' FROM VERBO V ';

module.exports.selectVerboPorCodigo = 
    ' SELECT ' +
    '   V.DESCRICAO as descricao, ' +
    '   V.CODIGO as codigo ' +
    ' FROM VERBO V ' + 
    ' WHERE ' +
    '   V.CODIGO = upper($codigo) ';

module.exports.insert = 
    ' INSERT INTO '
    + ' VERBO(CODIGO, DESCRICAO) '
    + ' VALUES($codigo, $descricao) ';