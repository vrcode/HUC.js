var print;

window.onload = function () {
    "use strict";
    var huc = document.body.appendChild(document.createElement("div"));
    huc.className = 'console';
    huc.innerHTML = "Testing...";
    huc.contentEditable = true;

    huc.innerHTML += '<br/>done loading';
    huc.innerHTML += '<br/><br/>&gt;&nbsp;';
    huc.focus();

    print = function (content) {
        huc.innerHTML += content + "<br/>";
    }

    cursorToEOD();


    var cmd = '';


    huc.onkeydown = function (e) {

        var key = e.keyCode;

        switch (key) {
            case 8:     // Backspace

                if (cmd.length == 0) {
                    return false;
                } else {
                    cmd = cmd.substring(0, cmd.length - 1);
                }
                break;

            case 0xd:   // Enter
                e.preventDefault();
                if (cmd.length > 0) {
                    if (cmd == 'clear') {
                        this.innerHTML = '&gt;&nbsp;';
                    } else {
                        console.log('Cmd: ' + cmd);
                        this.innerHTML += "<br/>";
                        try {
                            var result = eval(cmd);
                            console.log('Result: ' + result + ", type: " + typeof(result));
                            if (typeof(result) == 'string') {
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
                cursorToEOD();
                break;

            case 33:    // Page Up
            case 34:    // Page Down
            case 35:    // End
            case 36:    // Home
                break;

            case 37:    // Left
                if (cmd.length == 0) {
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
                cmd += ' ';
                break;

            case 188:   // Comma (,) / Less Than (<)
                if (e.shiftKey) {
                    cmd += "<";
                } else {
                    cmd += ",";
                }
                break;
            case 190:   // Dot (.) / Greater Than (>)
                if (e.shiftKey) {
                    cmd += ">";
                } else {
                    cmd += ".";
                }
                break;

            case 191:   // Slash (/) / Question Mark (?)
                if (e.shiftKey) {
                    cmd += "?";
                } else {
                    cmd += "/";
                }
                break;

            case 219:   // Left Square Bracket ([) / Left Curly Bracket ({)
                if (e.shiftKey) {
                    cmd += '{';
                } else {
                    cmd += '[';
                }
                break;

            case 220:   // Back Slash (\)
                cmd += "\\";
                break;

            case 221:   // Right Square Bracket (]) /  Right Curly Bracket (})
                if (e.shiftKey) {
                    cmd += '}';
                } else {
                    cmd += ']';
                }
                break;

            case 222:   // Single Quote (')
                if (e.shiftKey) {
                    cmd += '"';
                } else {
                    cmd += "'";
                }
                break;

            default:
                if (key > 40 && key <= 127) {
                    cmd += e.key;
                }
                break;
        }

    }

    function cursorToEOD() {
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
