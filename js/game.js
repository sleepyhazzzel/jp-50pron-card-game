// 生成遊戲區塊
for (let i = 9; i >= 0; i--) {
    $('#game-container').prepend(`
        <div class="game game-10" data-number="${i}">
        </div>
    `)
}
$('.game').eq(7).removeClass('game-10').addClass('game-6')
$('.game').eq(9).removeClass('game-10').addClass('game-6')

let dataNum = 0
// 用 watch套件 監聽 display轉換事件
$('.game').watch('display', function () {
    let $currentGame = $('.game:visible')
    dataNum = $currentGame.data('number')

    $('li').removeClass('white-box')
    $('li').eq(dataNum * 2).addClass('white-box')

    // 先還原
    $('#back').removeClass('transparent')
        .off('click')
        .on('click', function () {
            $('.card').fadeTo(1000, 1)
            $('.card').removeClass('card-ok')
            $('.card').addClass('card-close')

            $currentGame.css('display', 'none')
            $('.game').eq(dataNum - 1).css('display', 'grid')
        })

    $('#next').removeClass('transparent')
        .off('click')
        .on('click', function () {
            $('.card').fadeTo(1000, 1)
            $('.card').removeClass('card-ok')
            $('.card').addClass('card-close')
            $currentGame.css('display', 'none')
            $('.game').eq(dataNum + 1).css('display', 'grid')
        })

    // 再不顯示
    if (dataNum < 1) {
        $('#back').addClass('transparent').off('click')
    } else if (dataNum > 8) {
        $('#next').addClass('transparent').off('click')
    }
})

// 產生 6 張卡片
$('.game-6').append(generateCards(3, 'hira'))
$('.game-6').append(generateCards(3, 'kata'))

// 產生 10 張卡片
$('.game-10').append(generateCards(5, 'hira'))
$('.game-10').append(generateCards(5, 'kata'))

// 產生卡片
function generateCards(count, type) {
    let cards = '';
    for (let i = 0; i < count; i++) {
        cards += `
            <div class="card card-close ${type}" data-index="${i}">
                <div class="card-front"></div>
                <div class="card-back"></div>
            </div>`
    }
    return cards
}

$('.game').each(function () {
    let number = $(this).data('number')
    let array = []
    const array7 = [36, 38, 40]
    const array9 = [46, 50, 51]

    if (number === 7) {
        array = array7
    } else if (number === 9) {
        array = array9
    }

    // 置入卡牌正面 平假名、片假名圖片
    if ($(this).hasClass('game-6')) {
        $(this).find('.hira .card-front').each(function (index) {
            $(this).css('background-image', `url(./images/Hiragana/${array[index]}.png)`)
        })
        $(this).find('.kata .card-front').each(function (index) {
            $(this).css('background-image', `url(./images/Katakana/${array[index]}.png)`)
        })
    } else if ($(this).hasClass('game-10')) {
        $(this).find('.hira .card-front').each(function (index) {
            $(this).css('background-image', `url(./images/Hiragana/${(number * 5) + (index + 1)}.png)`)
        })
        $(this).find('.kata .card-front').each(function (index) {
            $(this).css('background-image', `url(./images/Katakana/${(number * 5) + (index + 1)}.png)`)
        })
    }

    // 置入卡牌背面背景圖片
    $(this).find('.card-back')
        .css('background-image', `url(./images/card-back/back${number + 1}.png)`)

    // 打亂
    for (let i = 0; i < 10; i++) {
        const randomA = Math.round(Math.random() * 10)
        const randomB = Math.round(Math.random() * 10)
        $(this).find('.card').eq(randomA).insertAfter($(this).find('.card').eq(randomB))
    }
})

// 翻牌事件
$('.card').on('click', function () {
    if (
        // .card 沒有 .card-close 代表被翻開
        // 如果已翻開數小於兩張
        $('.card:not(.card-close)').length < 2 &&
        // 且這張牌還沒翻開
        $(this).hasClass('card-close') &&
        // 這張牌還沒配對
        !$(this).hasClass('card-ok')
    ) {
        $(this).removeClass('card-close')
    }

    // 如果翻開兩張了
    if ($('.card:not(.card-close)').length === 2) {
        // 如果兩張一樣
        if (
            $('.card:not(.card-close)').eq(0).data('index') ===
            $('.card:not(.card-close)').eq(1).data('index')
        ) {
            $('.card:not(.card-close)').addClass('card-ok')
            $('.card:not(.card-close)').fadeTo(1000, 0)
        }

        setTimeout(function () {
            // 翻回來
            $('.card:not(.card-close)').addClass('card-close')
        }, 800)
    }

    // 進下一關
    if ($('.game:visible .card-ok').length === $('.game:visible .card').length) {
        setTimeout(function () {
            if (dataNum < 9) {
                $('.game:visible').css('display', 'none')
                $('.game').eq(dataNum + 1).css('display', 'grid')
            } else if (dataNum === 9) {
                $('#game-container').css('display', 'none')
                $('li').css('display', 'none')
                $('#table').css('display', 'flex')
            }
        }, 800)
    }
})