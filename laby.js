var prime = 10007;
var max_dist = 5;
var ANIMATE_TIME = 500;
var W = 5;
var game;
var score = 0;
var curx = 0; var cury = 0;
var centx = 0; var centy = 0;
var warn = false;
var away = 0;

function Game(C) {
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.c = C;
        return this;
}

function rval(x) {
        //alert("F : "+x);
        if (x == 0) {
                return (game.c)%prime;
        }
        var v = (x*x + game.c + rval((x/3)>>0))%prime;
        return v;
}

function cellval(x,y) {
        var v = (rval(x) + rval(y))%prime;
        return v%4;
}

function shroud(x,y) {
        //$(".board").animate({opacity:0},1000);
        //$(".board").css("height","0");
        $(".board").css("opacity",0);
        $(".shroud").animate({height:"100%"},ANIMATE_TIME,"linear",
                function() { $(this).after(draw(x,y,x,y)); }
        );
        $(".shroud").animate({height:0},ANIMATE_TIME);
        $(".board").css("opacity",1);
        //$(".board").animate({opacity:1},1000);
}


function draw(x,y,a,b) {
        if ((Math.abs(a-x) >= max_dist) || (Math.abs(b-y) >= max_dist)) {
                shroud(x,y);
                return;
        }
        //alert(cellval(-5,5));
        centx = a; centy = b;
        var ci = 0; var cj = 0;
        var curcell = "";                                 
        for (var i = b+W; i>=b-W; i--) {
                ci++; cj = 0;
                for (var j = a-W; j <= a+W; j++) {
                        cj++;
                        var cellname = "#cell"+ci+"_"+cj;
                        var v = cellval(j,i);
                        //alert(j+" : "+i+" : "+game.c+" : "+v);
                        if ((i == y) && (j == x)) {
                                curcell = cellname;
                        }
                        //$(cellname).css("margin","0px");
                        $(cellname).removeClass(); 
                        $(cellname).addClass("color"+v);
                        if (Math.abs(i) + Math.abs(j) <= away) {
                                $(cellname).addClass("lessdist");
                        }
                        //$(cellname).removeClass("player");
                        //$(cellname).text(j+","+i);
                }
        }
        $(curcell).addClass("player");
        //$(curcell).css("margin","10px");
        //$("#x").text(curx);
        //$("#y").text(cury);
        $("#score").text(score);
        
}       

function scores(x1,y1,x2,y2) {
        var a = cellval(x1,y1);
        var b = cellval(x2,y2);
        var d = Math.abs(x2) + Math.abs(y2);
        if (a!=b) {
                if (!warn) {
                        alert("Changing cell color costs you 10 points.");
                        warn = true;
                }
                score -= 10;  
        }
        if (d >= away) {
                score += 4*(d-away);
                away = d;
        }
}        

function fresh() {
        draw(curx,cury,centx,centy);
}

function up() {
        navigator.vibrate(10);
        cury++;
        scores(curx,cury-1,curx,cury);
        fresh();
}

function down() {
        navigator.vibrate(10);
        cury--;
        scores(curx,cury+1,curx,cury);
        fresh();
}

function left() {
        navigator.vibrate(10);
        curx--;
        scores(curx+1,cury,curx,cury);
        fresh();
}

function right() {
        navigator.vibrate(10);
        curx++;
        scores(curx-1,cury,curx,cury);
        fresh();
}        

function ld() {
        navigator.vibrate(10);
        curx--; cury--;
        scores(curx+1,cury+1,curx,cury);
        fresh();
}

function rd() {
        navigator.vibrate(10);
        curx++; cury--;
        scores(curx-1,cury+1,curx,cury);
        fresh();
}

function lu() {
        navigator.vibrate(10);
        curx--; cury++;
        scores(curx+1,cury-1,curx,cury);
        fresh();
}

function ru() {
        navigator.vibrate(10);
        curx++; cury++;
        scores(curx-1,cury-1,curx,cury);
        fresh();
}        

function buildGame() {
        game = new Game(2);
        str = "<table>";
        for (var i = 1; i<=2*W + 1;i++) {
                str += "<tr>";
                for (var j = 1; j<=2*W + 1;j++) {
                        str += "<td id = 'cell"+i+"_"+j+"'></td>";
                }
                str += "</tr>";
        }
        str += "</table>";
        $(".board").html(str);
        draw(0,0,0,0);
        $("#up").click(up);
        $("#down").click(down);
        $("#left").click(left);
        $("#right").click(right);
        $("#lu").click(lu);
        $("#ru").click(ru);
        $("#ld").click(ld);
        $("#rd").click(rd);
}
                                        

$(document).ready(buildGame);


