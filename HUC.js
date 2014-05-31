var print;

window.onload = function () {
    "use strict";
    var huc = document.body.appendChild(document.createElement("div"));
    huc.className = 'console';
    huc.contentEditable = true;

    huc.innerHTML += '<br/>Try some JavaScript!<br/>';
    huc.innerHTML += '<br/>&nbsp;&nbsp;examples:<br/>';
    huc.innerHTML += '<br/>&nbsp;&nbsp;- 1 + 1<br/>';
    huc.innerHTML += '&nbsp;&nbsp;- alert("test")<br/>';
    huc.innerHTML += '&nbsp;&nbsp;- window.a=[]; a.push("test"); a.length;<br/>';
    huc.innerHTML += '&nbsp;&nbsp;- clear <b style="color:#0a0">// To clear the console</b><br/>';
    huc.innerHTML += '<br/>&gt;&nbsp;';
    huc.focus();

    print = function (content) {
        huc.innerHTML += content + "<br/>";
    }

    cursorToEndOfDoc();


    var cmd = '';
    var cmds = [];
    var cursorCol = 0;


    huc.onkeydown = function (e) {

        var key = e.keyCode;
        cursorCol = window.getSelection().anchorOffset - 2;
        console.log(cursorCol);

        switch (key) {
            case 8:     // Backspace
                if (cursorCol > 0) {
                    cmd = cmd.substring(0, cursorCol - 1) + cmd.substring(cursorCol, cmd.length);
                } else {
                    return false;
                }
                break;

            case 9:     // Tab
                e.preventDefault();
                this.innerHTML += "&nbsp;&nbsp;";
                insertAtCursor('  ');
                cursorToEndOfDoc();
                break;

            case 0xd:   // Enter
                e.preventDefault();

                if (e.shiftKey) {
                    this.innerHTML += "<br/>&nbsp;";
                    cmd += '\n';
                } else {
                    if (cmd.length > 0) {
                        if (cmd == 'clear') {
                            this.innerHTML = '&gt;&nbsp;';
                        } else {
                            console.log('Cmd: ' + cmd);
                            this.innerHTML += "<br/>";
                            try {
                                var result = eval(cmd);
                                console.log('Result: ' + result + ", type: " + typeof (result));
                                if (typeof (result) == 'string') {
                                    result = "String: " + result;
                                }
                                if (result != undefined) {
                                    this.innerHTML += result;
                                }
                            } catch (err) {
                                this.innerHTML += err.message;
                            }
                            this.innerHTML += "<br/>&gt;&nbsp;";
                        }
                    } else {
                        this.innerHTML += '<br/>&gt;&nbsp;';
                    }
                    cmd = '';
                }
                cursorToEndOfDoc();
                break;

            case 33:    // Page Up
            case 34:    // Page Down
            case 35:    // End
            case 36:    // Home
                break;

            case 37:    // Left
                if (cursorCol < 1) {
                    return false;
                }
                break;

            case 38:    // Up
                e.preventDefault();
                break;

            case 39:    // Right
                break;

            case 40:    // Down
                break;

            case 123:   // F12
                e.preventDefault();
                break;

            case 32:    // Space
                insertAtCursor(' ');
                break;

            case 188:   // Comma (,) / Less Than (<)
                if (e.shiftKey) {
                    insertAtCursor("<");
                } else {
                    insertAtCursor(",");
                }
                break;
            case 190:   // Dot (.) / Greater Than (>)
                if (e.shiftKey) {
                    insertAtCursor(">");
                } else {
                    insertAtCursor(".");
                }
                break;

            case 191:   // Slash (/) / Question Mark (?)
                if (e.shiftKey) {
                    insertAtCursor("?");
                } else {
                    insertAtCursor("/");
                }
                break;

            case 219:   // Left Square Bracket ([) / Left Curly Bracket ({)
                if (e.shiftKey) {
                    insertAtCursor("{");
                } else {
                    insertAtCursor("[");
                }
                break;

            case 220:   // Back Slash (\)
                insertAtCursor("\\");
                break;

            case 221:   // Right Square Bracket (]) /  Right Curly Bracket (})
                if (e.shiftKey) {
                    insertAtCursor("}");
                } else {
                    insertAtCursor("]");
                }
                break;

            case 222:   // Single Quote (')
                if (e.shiftKey) {
                    insertAtCursor('"');
                } else {
                    insertAtCursor("'");
                }
                break;

            default:
                if (key > 40 && key <= 127) {
                    insertAtCursor(e.key);
                }
                break;
        }

    }

    function insertAtCursor(chars) {
        cmd = cmd.substring(0, cursorCol ) + chars + cmd.substring(cursorCol, cmd.length);
    }

    function cursorToEndOfDoc() {
        var range = document.createRange();
        var sel = window.getSelection();
        var lastChild = huc.childNodes[huc.childNodes.length - 1];
//        console.log('Children: ' + huc.childNodes.length);
//        console.log('Last Child: ' + lastChild.length);
        range.setStart(lastChild, lastChild.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

};
