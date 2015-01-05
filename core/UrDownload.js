/**
 * The core module contains core non-GUI functionality.
 * @module core
 */

/**
 * The UrDownload object is used to force a download
 * @class UrDownload
 * @extends UrObject
 * @author Flavien Collomb
 * @param {string} path Path of file to download
 * @param {string} [name] UrDownload name
 * @example
 *      var dl = new UrDownload("test.pdf");
 *      dl.go();
 * @constructor
 */
var UrDownload = function(path,name){
    /**
     * @property path
     * @type string
     * @description Path of file to download
     */
    this.path;

    if(path != undefined){
        this.path = path;

        var json = new UrJson({"path":path});
        json.checkType({"path":["string"]});

        UrObject.call(this, "UrDownload", name);
    }
};
UrDownload.prototype=new UrObject();
UrDownload.prototype.constructor=UrDownload;
/**
 * Launch download
 * @method go
 * @for UrDownload
 */
UrDownload.prototype.go = function(){
    var extension = this.path.split('.').pop();

    if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "gif" || extension == "bmp" || extension == "pdf" || extension == "txt")
        window.open(this.path);
    else{
        var body = document.getElementsByTagName("body")[0];
        body = new UrWidget({"element": body});

        var iframe = new UrIFrame({
            "parent":body,
            "style":{ "display":"none" },
            "src":this.path
        });
        setTimeout(function(){iframe.remove()},100);
    }
};