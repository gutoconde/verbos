module.exports.selectConjugacao = 
    ' SELECT ' +
    '   T.TEXTOFORMATO as textoFormato, ' +
    '   P.DESCRICAO as pessoa, ' +
    '   P.ORDEM as ordem, ' + 
    '   F.texto as verbo ' + 
    ' FROM CONJUGACAO C ' +
    '   LEFT JOIN FORMA F ON F.IDCONJUGACAO = C.ID ' +
    '   LEFT JOIN PESSOA P ON P.ID = F.IDPESSOA ' +
    '   JOIN VERBO V ON V.ID = C.IDVERBO ' +
    '   JOIN TEMPO T ON T.ID = C.IDTEMPO ' +
    '   LEFT JOIN MODO M ON M.ID = T.IDMODO AND M.CODIGO = $modo ' +
    ' WHERE ' +
    '   1=1 ' +
    '   AND V.CODIGO = upper($verbo) ' +
    '   AND T.CODIGO = $tempo ' +
    ' ORDER BY P.ORDEM asc';

module.exports.insert = 
    ' INSERT INTO '
    + ' CONJUGACAO(IDVERBO, IDTEMPO ) '
    + ' VALUES($idVerbo, (SELECT ID FROM TEMPO WHERE CODIGO = $codigoTempo) ) ';

module.exports.insertForma = 
    ' INSERT INTO '
    + ' FORMA(IDCONJUGACAO, IDPESSOA, TEXTO) '
    + ' VALUES($idConjugacao, $idPessoa, $texto) ';

    