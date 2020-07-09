(function ($) {
    $.fn.puissance4 = function (x, y, color1, color2, nameGamer1, nameGamer2) {
        $('#game').ready(function () {
            const p4 = new P4('#game', x, y, color1, color2, nameGamer1, nameGamer2);

            $('#restart').on('click', function () {
                $('#game').empty();
                p4.creationGrille();
                $('#lastModal').css('display', 'none');
            });
        });
        
        document.getElementById('tourOne').innerHTML = nameGamer1;
        document.getElementById('tourTwo').innerHTML = nameGamer2;        

        if (color1 == color2) {
            alert('Vous ne pensez pas que choisir la même couleur n\'est pas une bonne idée..?');
            color1 = document.getElementById('colorOne').style.background = '#ff0000';
            color2 = document.getElementById('colorTwo').style.background = '#ffd900';
        } else {
            document.getElementById('colorOne').style.backgroundImage = `radial-gradient(circle at top left, white, ${color1})`;
            document.getElementById('colorTwo').style.backgroundImage = `radial-gradient(circle at top left, white, ${color2})`;
        }
    };
})(jQuery);