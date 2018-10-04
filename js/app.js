/*********************************************************************
 * Settings
 *********************************************************************/
var outputType = "image/jpeg";                           // Options: "image/png" "image/svg+xml" "image/jpeg" 
var canvasBackgroundColor = 'rgb(255, 255, 255)';       // It's Necessary to use an opaque color when saving image as JPEG;

var noSignMessage = "Please provide a signature first.";

var wrapper = document.getElementById("signature-pad");
var canvas = wrapper.querySelector("canvas");
var clearButton = wrapper.querySelector("[data-action=clear]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var confirmButton = wrapper.querySelector("[data-action=confirm]");
var skipButton = wrapper.querySelector("[data-action=skip]");
var preview = document.getElementById("preview");

/*********************************************************************
 * Canvas
 *********************************************************************/
var signaturePad = new SignaturePad(canvas, {
  backgroundColor: canvasBackgroundColor
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

/*********************************************************************
 * Buttons event listeners
 *********************************************************************/

//ClearButton
clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

//UndoButton
undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

//confirmButton
confirmButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert(noSignMessage);
  } else {
    var signatureImage = signaturePad.toDataURL(outputType);
    previewImage(signatureImage);
  }
});

//SkipButton
skipButton.addEventListener("click", function (event) {
  alert("Skip clicked");
});

/*********************************************************************
 * Demo functions
 *********************************************************************/
 
//preview image
function previewImage(signatureImage) {

  preview.src = signatureImage;

  document.body.appendChild(DOM_img);
}