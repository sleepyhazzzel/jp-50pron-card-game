const pronounce = ['（a）', '（ka）', '（sa）', '（ta）', '（na）', '（ha）', '（ma）', '（ya）', '（ra）', '（wa）']

for (let i = 0; i < 10; i++) {
    $('ul').append(`
    <li><span>${pronounce[i]}</span></li>
    <li>▾</li>
    `)
}
$('ul li:last-child').remove()

$('ul li:even').each(function (index) {
    // .wrap() => 可以將 html 包裹在外層
    $(this).wrap(`<a data-number="${index}"></a>`)
    $(this).prepend(`
    <img src="./images/Hiragana/${index * 5 + 1}.png">
    <img src="./images/Katakana/${index * 5 + 1}.png">
    `)
})

$('a').on('click', function () {
    let index = $(this).data('number')
    console.log(index)
    $('.game:visible').css('display', 'none')
    $('.game').eq(index).css('display', 'grid')
})

$('#home-btn').on('click', function () {
    $('.game:visible').css('display', 'none')
    $('#game-container').css('display', 'none')
    $('li').css('display', 'none')
    $('#table').css('display', 'flex')
})