(this["webpackJsonpmobx-minesweeper"]=this["webpackJsonpmobx-minesweeper"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var s,l,o=n(1),a=n(0),i=n.n(a),r=n(6),u=n.n(r),c=(n(14),n(3)),h=n(4),f=n(2),O=-1,m=function(){function e(t,n,s){Object(c.a)(this,e),this.columns=t,this.rows=n,this.totalBombs=s,this.fieldValues=void 0,this.fieldValues=[];for(var l=0;l<n;l++)this.fieldValues.push([]);this.placeBombs(),this.placeNumbers()}return Object(h.a)(e,[{key:"getBombsNearby",value:function(e,t){for(var n=0,s=0,l=[[e-1,t-1],[e-1,t],[e-1,t+1],[e,t-1],[e,t+1],[e+1,t-1],[e+1,t],[e+1,t+1]];s<l.length;s++){var o=l[s];(this.fieldValues[o[0]]||[])[o[1]]===O&&n++}return n}},{key:"placeBombs",value:function(){for(var e=0;e<this.totalBombs;){var t=Math.floor(Math.random()*this.rows),n=Math.floor(Math.random()*this.columns);this.fieldValues[t][n]!==O&&(this.fieldValues[t][n]=O,e++)}}},{key:"placeNumbers",value:function(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.columns;t++)this.fieldValues[e][t]!==O&&(this.fieldValues[e][t]=this.getBombsNearby(e,t))}}]),e}();!function(e){e[e.DEFAULT=0]="DEFAULT",e[e.OPEN=1]="OPEN",e[e.MARKED_BOMB=2]="MARKED_BOMB"}(s||(s={})),function(e){e[e.IN_PROGRESS=0]="IN_PROGRESS",e[e.WON=1]="WON",e[e.LOST=2]="LOST"}(l||(l={}));var b=function(){function e(){var t=this;Object(c.a)(this,e),this.cells=void 0,this.gameStatus=void 0,this.cellsOpen=0,this.openCell=function(e,n){if(t.gameStatus===l.IN_PROGRESS&&!(e<0||e>=5||n<0||n>=10)){var o=t.cells[e][n];o.status===s.DEFAULT&&(o.status=s.OPEN,t.cellsOpen++,o.value!==O?(0===o.value&&(t.openCell(e-1,n-1),t.openCell(e-1,n),t.openCell(e-1,n+1),t.openCell(e,n-1),t.openCell(e,n+1),t.openCell(e+1,n-1),t.openCell(e+1,n),t.openCell(e+1,n+1)),t.isVictory()&&(t.gameStatus=l.WON)):t.gameStatus=l.LOST)}},this.toggleMarkBomb=function(e,n){if(t.gameStatus===l.IN_PROGRESS){var o=t.cells[e][n];o.status===s.DEFAULT?o.status=s.MARKED_BOMB:o.status===s.MARKED_BOMB&&(o.status=s.DEFAULT)}};var n=new m(10,5,5).fieldValues;this.cells=[];for(var o=0;o<5;o++)for(var a=0;a<10;a++)this.cells[o]||(this.cells[o]=[]),this.cells[o][a]={status:s.DEFAULT,value:n[o][a]};this.gameStatus=l.IN_PROGRESS,Object(f.d)(this,{cells:f.e,gameStatus:f.e,openCell:f.b,toggleMarkBomb:f.b})}return Object(h.a)(e,[{key:"isVictory",value:function(){return 45===this.cellsOpen}}]),e}(),v=n(7),g=n.n(v),p=n(19);n(16);function d(e,t){return e===s.DEFAULT?null:e===s.OPEN?t===O||0===t?null:t:"|>"}var S=Object(p.a)((function(e){var t=e.cell,n=t.status,l=t.value;return Object(o.jsx)("div",{className:g()("cell",{cell_open:n===s.OPEN},{cell_danger:n===s.OPEN&&l===O}),onClick:e.onOpen,onContextMenu:function(t){t.preventDefault(),e.onToggleMarkBomb()},children:d(n,l)})})),j=(n(17),function(e){var t=e.gameStore,n=t.cells,s=t.openCell,l=t.toggleMarkBomb;return Object(o.jsx)("div",{children:n.map((function(e,t){return Object(o.jsx)("div",{className:"row",children:e.map((function(e,n){return Object(o.jsx)(S,{cell:e,onOpen:function(){return s(t,n)},onToggleMarkBomb:function(){return l(t,n)}},n)}))},t)}))})}),E=Object(p.a)((function(e){var t=e.gameStore.gameStatus;return t===l.IN_PROGRESS?null:Object(o.jsx)("strong",{children:t===l.LOST?"You lost :(":"You won :)"})})),B=new b;var N=function(){return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(j,{gameStore:B}),Object(o.jsx)(E,{gameStore:B})]})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,s=t.getFID,l=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),s(e),l(e),o(e),a(e)}))};u.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(N,{})}),document.getElementById("root")),M()}},[[18,1,2]]]);
//# sourceMappingURL=main.dfc11e43.chunk.js.map