class P4 {
    constructor(selector, x, y, color1, color2, nameGamer1, nameGamer2) {
        this.y = y;
        this.x = x;
        this.selector = selector;
        this.player = 'joueur1';
        this.color1 = color1;
        this.color2 = color2;
        this.nameGamer1 = nameGamer1;
        this.nameGamer2 = nameGamer2;
        this.nbrVictoires1 = 0;
        this.nbrVictoires2 = 0;

        $('#score1').html(this.nbrVictoires1);
        $('#score2').html(this.nbrVictoires2);

        this.creationGrille();
        this.ecoute();
        this.verifierGagnant();
    }

    creationGrille() {
        const $jeu = $(this.selector);

        for (let lgn = 0; lgn < this.x; lgn++) {
            const $lgn = $('<div>').addClass('row');

            for (let col = 0; col < this.y; col++) {
                const $col = $('<div>').addClass('col empty').attr("data-col", col).attr("data-lgn", lgn);
                $lgn.append($col);
            }
            $jeu.append($lgn);
            $('#lastMouv').css('display', 'inline-block');

        }
    }

    ecoute() {
        const $jeu = $(this.selector);
        const that = this;

        function derniereCaseVide(col) {
            const $cells = $(`.col[data-col='${col}']`);

            for (let i = $cells.length - 1; i >= 0; i--) {
                const $cell = $($cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }

        $jeu.on('mouseenter', '.col.empty', function () {
            const $col = $(this).data('col');
            const $last = derniereCaseVide($col);

            if ($last != null) {
                $last.addClass(`p${that.player}`);
            }
        });

        $jeu.on('mouseleave', '.col', function () {
            $('.col').removeClass(`p${that.player}`);
        });

        $jeu.on('click', '.col.empty', function () {
            const col = $(this).data('col');
            const $last = derniereCaseVide(col);

            if (that.player == 'joueur1') {
                $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', `${that.player}`);

                $(`.${that.player}`).css('background-image', `radial-gradient(circle at top left, white, ${that.color1})`);
                $('.gamer2').css('border', `3mm ridge ${that.color2}`);
                $('.gamer1').css('border', '3mm ridge #6c757d');
                $('.gamer2').css('opacity', '0.5');
                $('.gamer1').css('opacity', '1');
                $('#gamerTwo').html('À ton tour');
                $('#gamerOne').html('Joueur 1');

                const vides = $('.empty').length;
                if (vides == 0) {
                    $('#lastModal').css('display', 'block');
                    $('#felicitations').html('Pas de gagnant');
                    $('.modal-body').html(`<h3>Score nul</h3>`);
                }
            } else if (that.player == 'joueur2') {
                $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', `${that.player}`);

                $(`.${that.player}`).css('background-image', `radial-gradient(circle at top left, white, ${that.color2})`);
                $('.gamer1').css('border', `3mm ridge ${that.color1}`);
                $('.gamer2').css('border', '3mm ridge #6c757d');
                $('.gamer1').css('opacity', '0.5');
                $('.gamer2').css('opacity', '1');
                $('#gamerOne').html('À ton tour');
                $('#gamerTwo').html('Joueur 2');

                var vides = $('.empty').length;
                if (vides == 0) {
                    $('#lastModal').css('display', 'block');
                    $('#felicitations').html('Pas de gagnant');
                    $('.modal-body').html(`<h3>Score nul</h3>`);
                }
            }

            const winner = that.verifierGagnant($last.data('lgn'), $last.data('col'));

            that.player = (that.player === 'joueur1') ? 'joueur2' : 'joueur1';

            if (winner == 'joueur1') {
                $('#lastModal').css('display', 'block');
                $('.modal-body').html(`<h3><b>${that.nameGamer1}</b> a gagné la partie !</h3>`);

                that.nbrVictoires1++;
                $('#score1').html(that.nbrVictoires1);

                return;
            } else if (winner == 'joueur2') {
                $('#lastModal').css('display', 'block');
                $('#felicitations').html('Felicitations !');
                $('.modal-body').html(`<h3><b>${that.nameGamer2}</b> a gagné la partie !</h3>`);

                that.nbrVictoires2++;
                $('#score2').html(that.nbrVictoires2);

                return;
            }
        });
    }

    verifierGagnant(lgn, col) {
        const that = this;

        function getCell(i, j) { return $(`.col[data-lgn='${i}'][data-col='${j}']`); }

        function verifierDirection(direction) {
            let total = 0;
            let i = lgn + direction.i;
            let j = col + direction.j;
            let $next = getCell(i, j);

            while (i >= 0 && i < that.x && j >= 0 && j < that.y && $next.data('player') === that.player) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = getCell(i, j);
            }
            return total;
        }

        function verifierGagnant(directionA, directionB) {
            const total = 1 + verifierDirection(directionA) + verifierDirection(directionB);
            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        function checkHori() {
            return verifierGagnant({ i: 0, j: -1 }, { i: 0, j: 1 });
        }

        function checkVerti() {
            return verifierGagnant({ i: -1, j: 0 }, { i: 1, j: 0 });
        }

        function checkDiag1() {
            return verifierGagnant({ i: 1, j: 1 }, { i: -1, j: -1 });
        }

        function checkDiag2() {
            return verifierGagnant({ i: 1, j: -1 }, { i: -1, j: 1 });
        }

        return checkHori() || checkVerti() || checkDiag1() || checkDiag2();
    }
}