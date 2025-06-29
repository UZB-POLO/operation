module.exports = async () => {
    let result = `
    <!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>ЗАЯВЛЕНИЕ - ИПАК ЙУЛИ</title>
  <style>
    body {
      font-family: 'Times New Roman', serif;
      margin: 40px 60px;
      line-height: 1.5;
      font-size: 16px;
    }
    .centerr {
       text-align: center;
    }

    h1, h2 {
      text-align: center;
      text-transform: uppercase;
      margin: 0;
    }

    h2 {
      margin-top: 20px;
      font-size: 18px;
      letter-spacing: 2px;
    }

    p {
      margin: 0px 0;
    }

    .center {
      text-align:left;
    }

    .bold {
      font-weight: bold;
    }

    .signature-line {
      border-bottom: 1px solid #000;
      width: 300px;
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .small {
      font-size: 14px;
    }



    .section-title {
      text-align: center;
      font-weight: bold;
      margin-top: 40px;
      margin-bottom: 10px;
    }

    .bank-info {
      margin-left: 20px;
    }
   .flex{
    display: flex;
    justify-content: space-between;
   }
   .centerrr{
    width: 140px;
   }
   .centerrrr{
    height: 30px;
    text-align: center;
   }
    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 10px;
    }
    

    ul li {
      margin-bottom: 5px;
    }
  </style>
</head>
<body>

  <h2>АКБ «ИПАК ЙУЛИ»</h2>
  <p class="centerr" style="height: 15px;"><strong>От ILKHOM SAITOV IZATILLAYEVICH</strong></p>
  <p class="centerr">(наименование заявителя)</p>

  <h3 class="centerr">ЗАЯВЛЕНИЕ</h3>

  <div class="flex">
    <p class="center">Прошу открыть счет  </p>
    <strong class="centerr">срочный</strong>
    <strong class="centerrr"></strong>
  </div>
  <p class="centerrrr">(депозит до востребования, срочный, сберегательный депозит и др.)</p>

  <p class="center" style="height: 5px;">в Узбекские сумы на имя <strong>ILKHOM SAITOV IZATILLAYEVICH</strong> </p>
 
    
    <pre style="height: 20px;">                     (фамилия, имя, отчество)</pre>

  <p style="height: 5px;">Сообщаю образец моей подписи (____________________________________) </p>

  <pre style="height: 20px;">                          подпись уполномоченного мною лица</pre>

  <p style="height: 5px;"><strong>ILKHOM SAITOV IZATILLAYEVICH</strong>, которая является обязательной</p>
  <pre>    (фамилия, имя, отчество)</pre>

  <pre style="height: 5px;">дата <strong>2025-06-26</strong> года _______________________________________</pre>
  <pre>                            (подпись владельца счета)</pre>

  <p class="section-title">ОТМЕТКА БАНКА</p>

  <h4>Документы на открытие счета, проверил; главный бухгалтер _________________</h4>

  <pre style="height: 5px;">    Разрешаю открыть <strong>срочный счет                                в Узбекские сумы</strong></pre>
<pre>(депозит до востребования, срочный, сберегательный депозит и др.)(наименование валюты)</pre>


  <pre><strong>                    ТОШКЕНТ Ш., "ИПАК ЙУЛИ" АИТ БАНКИНИНГ БОШ ______________
                                           ОФИСИ</strong></pre>

  <p>Счет открыт: <strong>2025-06-26</strong> года</p>
  <p>Номер счета: <strong>20606000062138721041</strong></p>
  <p>Прочие отметки (данные паспорта):</p>
  <ul>
    <li>Дата рождения: <strong>1986-05-21</strong></li>
    <li>Паспорт, серия: <strong>AD 1696363</strong></li>
    <li>Дата выдачи паспорта: <strong>2022-08-24</strong></li>
    <li>Место выдачи: <strong>IPV26266</strong></li>
    <li>Место жительства: <strong>SHALOLA MFY TEMUR MALIK 1 PROYEZD 42</strong></li>
  </ul>

  <p>№ вкладной книжки: _______________________</p>

</body>
</html>
`
    return result
}