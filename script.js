document.title = "Anyway Lose";

alert("Hello %username%! You can move with '⇐' '⇑' '⇒' '⇓' keys, and fire on <space>. Default move speed is 8 pixels per one press. You can increase it by press button. To run the game click 'start'. Pineapples can be treacherous. Watch out the blackholes. Good luck!      WIN OR DIE!")

var i = '1';

var j = '1';

var score = 0;

var lvl = 1;

var lives = 5;

var firesign = "~~>";

var pix_toMove = 8;

var bonus_toScore = 50;

var unit_pic = ["./pic/unit.svg","./pic/unit2.svg","./pic/unit3.svg","./pic/unit4.svg", "./pic/win.jpg"];

var korabl = document.getElementById("korabl");

boost.onclick = function () {
    pix_toMove += 2;
    var spd = document.getElementById("speed");
    spd.innerHTML = "Current speed: " + pix_toMove + "px";
}
start.onclick = function globalTimer () {
    var had = document.getElementById("had");
    var inter = setInterval(function () {
        had.style.marginTop = getMarginTop(had) - 1 + 'px';
        if (getMarginTop(had) <= -170) {
            clearInterval(inter);
        };
    }, 20)
    createAn();
    setInterval(function () {
            createEnemy()
    }, 2000)
    setInterval(function () {
            createBlackHole()
    }, 8000)
    setInterval(function () {
            createEat();
    }, 11000)
    setInterval(function () {
            createAn();
    }, 96000)
}
HiddenButtonForWin.onclick = function () {
    alert("Nu zdravstvuy stalker. You are still loser.");
    location.reload();
}

function createBlackHole () {
    var BlackHole = document.createElement("img");
    BlackHole.style.position = 'absolute';
    //BlackHole.style.border = '4px double red';
    BlackHole.style.id = 'BlackHole';
    BlackHole.style.width = '100px'
    BlackHole.style.marginLeft = '100%';
    BlackHole.style.marginTop = getRandomInt(0, 500) + 'px';
    BlackHole.src='./pic/blackhole.svg';
    document.body.appendChild(BlackHole);
    goBlackHole(BlackHole);
}
function goBlackHole (BlackHole) {
    var interval = setInterval(function () {
        var left = getMarginLeft(BlackHole);
        BlackHole.style.marginLeft = left - 3 + 'px';
        if (left <= -100) {
            document.body.removeChild(BlackHole);
            delete BlackHole;
        }
        if (left <= getMarginLeft(korabl) + 100 &&
            left >= getMarginLeft(korabl)) {
            if (getMarginTop(BlackHole) >= getMarginTop(korabl) - 30 &&
                getMarginTop(BlackHole) <= getMarginTop(korabl) + 80) {
                //alert("~!");
                lives -= 5;
                if (lives <= 0) {
                    alert("Oh, f*cking black hole. You lose. Try again.");
                    alert("BTW, if you wanna know what`s happens when you fall in black hole, you can follow the link 'https://teletype.in/@nakedspace/HJrT6uhs7'");
                    location.reload();
                }
                var i = -1;
                var live_css = document.getElementById("lives");
                live_css.innerHTML = "Lives: "
                while (++i < lives) {
                live_css.innerHTML += "• ";
                }
                document.body.removeChild(BlackHole);
                delete BlackHole;
            };
        };
    }, 20)
}

function createEat () {
    var eat = document.createElement("img");
    eat.style.position = 'absolute';
    eat.style.id = 'eat';
    eat.style.width = '100px'
    eat.style.marginLeft = '100%';
    eat.style.marginTop = getRandomInt(0, 500) + 'px';
    eat.src='./pic/eat2.svg';
    document.body.appendChild(eat);
    goEat(eat);
}
function goEat (eat) {
    var interval = setInterval(function () {
        var left = getMarginLeft(eat);
        eat.style.marginLeft = left - 1 + 'px';
        if (left <= 0) {
            document.body.removeChild(eat);
            delete eat;
        }
        if (left <= getMarginLeft(korabl) + 100 &&
            left >= getMarginLeft(korabl)) {
            if (getMarginTop(eat) >= getMarginTop(korabl) + 30 &&
                getMarginTop(eat) <= getMarginTop(korabl) + 170) {
                lives++;
                var i = -1;
                var live_css = document.getElementById("lives");
                live_css.innerHTML = "Lives: "
                while (++i < lives) {
                live_css.innerHTML += "• ";
                }
                document.body.removeChild(eat);
                delete eat;
            };
        };
    }, 20)
}


function createAn () {
    var an = document.createElement("img");
    an.style.position = 'absolute';
    an.style.id = 'an';
    an.style.width = '100px'
    an.style.marginLeft = '100%';
    an.style.marginTop = getRandomInt(0, 500) + 'px';
    an.src='./pic/eat1.svg';
    document.body.appendChild(an);
    goAn(an);
}
function goAn (an) {
    var interval = setInterval(function () {
        var left = getMarginLeft(an);
        an.style.marginLeft = left - 3 + 'px';
        if (left <= -50) {
            document.body.removeChild(an);
            delete an;
        }
        if (left <= getMarginLeft(korabl) + 100 &&
            left >= getMarginLeft(korabl)) {
            if (getMarginTop(an) >= getMarginTop(korabl) + 30 &&
                getMarginTop(an) <= getMarginTop(korabl) + 170) {
                bonus_toScore += 50;
                document.body.removeChild(an);
                delete an;
            };
        };
    }, 20)
}

function goEnemy (enemy) {
    var start = Date.now();

    var cs = window.getComputedStyle(enemy);
    var left = parseInt(cs.marginLeft);

    var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        enemy.style.marginLeft = left - timePassed/3 + 'px';
        if (parseInt(cs.marginLeft) <= -200) {
            lives--;
            var i = -1;
            var live_css = document.getElementById("lives");
            live_css.innerHTML = "Lives: "
            while (++i < lives) {
                live_css.innerHTML += "• ";
            }
            if (lives <= 0) {
                alert("Looooooser!");
                location.reload();
            };
            clearInterval(timer);
            document.body.removeChild(enemy);
            delete enemy;
        };
    }, 20)
}
function createEnemy () {
    var enemy = document.createElement("img");
    enemy.id =  "enemy" + i;
    enemy.style.position = 'absolute';
    enemy.style.width = '200px';
    enemy.style.marginLeft = '100%';
    enemy.style.marginTop = getRandomInt(0, 500) + 'px';
    enemy.src='./pic/enemy.png';
    enemy.alt='enemy';
    i++;
    document.body.appendChild(enemy);
    goEnemy(enemy);
    delete enemy;
}


function checkClash (fire, enemy) {
    var enemy1 = document.getElementById("enemy" + (i - 1));
    var enemy2 = document.getElementById("enemy" + (i - 2));
    var enemy3 = document.getElementById("enemy" + (i - 3));
    if ((getMarginLeft(fire) >= getMarginLeft(enemy1)) &&
            (getMarginTop(fire) >= getMarginTop(enemy1) + 30 &&
            getMarginTop(fire) <= getMarginTop(enemy1) + 170)) {
            document.body.removeChild(enemy1);
            delete enemy1;
        return (true);
    };
    if ((getMarginLeft(fire) >= getMarginLeft(enemy2)) &&
            (getMarginTop(fire) >= getMarginTop(enemy2) + 30 &&
            getMarginTop(fire) <= getMarginTop(enemy2) + 170)) {
            document.body.removeChild(enemy2);
            delete enemy2;
        return (true);
    };
    if ((getMarginLeft(fire) >= getMarginLeft(enemy3)) &&
            (getMarginTop(fire) >= getMarginTop(enemy3) + 30 &&
            getMarginTop(fire) <= getMarginTop(enemy3) + 170)) {
            document.body.removeChild(enemy3);
            delete enemy3;
        return (true);
    };
}


function shoot () { //.. и запускаем этот элемент
	var fire = document.getElementById("fire" + (j - 1));
  
    var left = getMarginLeft(korabl) + 150;

	var start = Date.now();

	var timer = setInterval(function () {

		var timePassed = Date.now() - start;

        if (checkClash(fire) == true) {
            //alert("Yeeeaaahh");
            score += bonus_toScore;
            var sc = document.getElementById("score");
            sc.innerHTML = "Score: " + score + "&ensp;&ensp;";
            //alert(score / 600);
            if (Math.floor(score / 600) >= lvl) {
                lvl++;
                var level = document.getElementById("level");
                level.innerHTML = "Level: " + lvl;
                var korabl = document.getElementById("korabl");
                korabl.src = unit_pic[Math.floor(score / 600)];
                if (lvl == 3){
                firesign = "~~> <br> ~~>";                    
                }
                if (lvl == 4) {
                korabl.style.paddingTop = "37px";
                firesign = "~~> <br><br> ~~> <br><br> ~~>";    
                }
                if (lvl == 5) {
                    var win = document.createElement("img");
                    win.style.position = 'absolute';
                    win.style.marginLeft = '0px';
                    win.style.marginTop = '0px';
                    win.style.width = screen.width + 'px';
                    win.src='./pic/win.jpg';
                    document.body.appendChild(win);
                    alert("In despite of text on this picture, you`re already LOSE. Ha-Ha! Reload the page to try one more time. ");
                    
                    setTimeout("location.reload()", 5000);
                }
            }
            clearInterval(timer);
            document.body.removeChild(fire);
        }
        if (left + timePassed / 3 >  1.5 * screen.width) {
            //alert("bom");
            clearInterval(timer);
            document.body.removeChild(fire);
        }
		fire.style.marginLeft = left + timePassed / 3 + 'px';
	}, 20)
}
function createFire () { //Создаём элемент...
	var fire = document.createElement('div');
    var korabl = document.getElementById('korabl')
	fire.id = "fire" + j;
    j++;
    fire.style.position = "absolute";
    fire.style.marginLeft = getMarginLeft(korabl) + 150 + "px";
    fire.style.marginTop = getMarginTop(korabl) + 90 + 'px';
    fire.style.color = "#a7ff23";  
	fire.innerHTML = firesign;
	document.body.appendChild(fire);
}


function getMarginTop (elem) {
    if (elem) {
        var cs = window.getComputedStyle(elem);
    // достаем интовое значение из отступов
    var top = parseInt(cs.marginTop);
    delete elem;
    return (top);
    };
    delete elem;
    return (9999);
}
function getMarginLeft (elem) {
    if (elem) {
        var cs = window.getComputedStyle(elem);
    // достаем интовое значение из отступов
    var left = parseInt(cs.marginLeft);
    delete elem;
    return (left);
    };
    delete elem;
    return(9999);
}
function getRandomInt(min, max){
      return (Math.floor(Math.random() * (max - min + 1)) + min);
}


function moveUnit(e) {
     
    var korabl = document.getElementById("korabl");
    // получаем стиль для korabl
    var cs = window.getComputedStyle(korabl);
    // достаем интовое значение из отступов
    var left = parseInt(cs.marginLeft);
    var top = parseInt(cs.marginTop);
     
    switch(e.keyCode){ //e.keyCode - возвращает код нажатой клавиши
         
        case 37:  // если нажата клавиша влево
            if(left>0)
                korabl.style.marginLeft = left - pix_toMove + "px";
            break;
        case 38:   // если нажата клавиша вверх
            if(top>0)
                korabl.style.marginTop = top - pix_toMove + "px";
            break;
        case 39:   // если нажата клавиша вправо
            if(left < document.documentElement.clientWidth - 220)
                korabl.style.marginLeft = left + pix_toMove + "px";
            break;
        case 40:   // если нажата клавиша вниз
            if(top < document.documentElement.clientHeight - 100)
                korabl.style.marginTop = top + pix_toMove + "px";
            break;
        case 32:	// if <space>
        	createFire();
            shoot(); 
        	break;
    }
}

addEventListener("keydown", moveUnit); //если нажата любая клавиша - вызываем ф-цию moveUnit
