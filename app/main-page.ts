import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import bghttp = require("nativescript-background-http");
import { HelloWorldModel } from './main-view-model';
var session = bghttp.session("image-upload");
import {path, knownFolders} from "file-system"

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();
}


export function  onTap(){
  let folder = knownFolders.documents();
  let pathfile = path.join(folder.path, "app/image2.jpeg");
  console.log("file path "+pathfile);
  uploadImage(pathfile);
}

var task;
function uploadImage(filePath) {
    var request = {
        url: "http://httpbin.org/post",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": "Test.png"
        },
        description: "{ 'uploading': " + "Test.png" + " }"
    };

    task = session.uploadFile(filePath, request);
    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("complete", uploadComplete);

   
}
 function logEvent(e) {
        console.log("----------------");
        console.log('Status: ' + e.eventName);
        if (e.totalBytes !== undefined) {
            console.log('current bytes transfered: ' + e.currentBytes);
            console.log('Total bytes to transfer: ' + e.totalBytes);
        }
    }

    function uploadComplete() {
        console.log('Upload complete');
    }