// 方格生成
let gridHtml = ''
let row = 11
let col = 5
const fifty = [
    ['a', 'i', 'u', 'e', 'o'],
    ['ka', 'ki', 'ku', 'ke', 'ko'],
    ['sa', 'si', 'su', 'se', 'so'],
    ['ta', 'ti', 'tu', 'te', 'to'],
    ['na', 'ni', 'nu', 'ne', 'no'],
    ['ha', 'hi', 'hu', 'he', 'ho'],
    ['ma', 'mi', 'mu', 'me', 'mo'],
    ['ya', '', 'yu', '', 'yo'],
    ['ra', 'ri', 'ru', 're', 'ro'],
    ['wa', '', '', '', 'wo'],
    ['n', '', '', '', ''],
]

for (let i = 0; i < row - 1; i++) {
    $('#background').append(`
    <div class="bg-row" data-index="${i}"></div>
    `)
}

for (let i = 0; i < row; i++) {
    gridHtml += '<div class="row">'
    for (let j = 0; j < col; j++) {
        gridHtml += `
        <div class="box">
            <div class="smallText">${fifty[i][j]}</div>
        </div>`
    }
    gridHtml += '</div>'
}
$('#hiragana').html(gridHtml)
$('#katakana').html(gridHtml)

// 放文字
$('#hiragana .box').each(function (index) {
    $(this).css('background-image', `url(./images/Hiragana/${index + 1}.png)`)
})
$('#katakana .box').each(function (index) {
    $(this).css('background-image', `url(./images/Katakana/${index + 1}.png)`)
})

//顯示拼音
$('.bg-row').on('mouseenter', function () {
    let rowNum1 = $(this).index()
    let rowNum2 = rowNum1 + 11
    $(`.row:eq(${rowNum1}) .smallText`).css('display', 'block')
    $(`.row:eq(${rowNum2}) .smallText`).css('display', 'block')
    if (rowNum1 === 9) {
        $(`.row:eq(${rowNum1 + 1}) .smallText`).css('display', 'block')
        $(`.row:eq(${rowNum2 + 1}) .smallText`).css('display', 'block')
    }
})
$('.bg-row').on('mouseleave', function () {
    let rowNum1 = $(this).index()
    let rowNum2 = rowNum1 + 11
    $(`.row:eq(${rowNum1}) .smallText`).css('display', 'none')
    $(`.row:eq(${rowNum2}) .smallText`).css('display', 'none')
    if (rowNum1 === 9) {
        $(`.row:eq(${rowNum1 + 1}) .smallText`).css('display', 'none')
        $(`.row:eq(${rowNum2 + 1}) .smallText`).css('display', 'none')
    }
})

// 進入遊戲
$('.bg-row').on('click', function () {
    $('#table').css('display', 'none')
    $('li').css('display', 'flex')
    $('#game-container').css('display', 'flex')
    $(`.game:eq(${$(this).data('index')})`).css('display', 'grid')
})