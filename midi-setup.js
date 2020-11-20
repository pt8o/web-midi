var midi;
var inputs;
var outputs;

function onMIDIFailure(msg) {
  console.log("Failed to get MIDI access - " + msg);
}

function onMIDISuccess(midiAccess) {
  midi = midiAccess;
  inputs = midi.inputs;
  outputs = midi.outputs;
  setTimeout(testOutputs, 500);
}

function testOutputs() {
  console.log("Testing MIDI-Out ports...");
  outputs.forEach(function (port) {
    console.log(
      "id:",
      port.id,
      "manufacturer:",
      port.manufacturer,
      "name:",
      port.name,
      "version:",
      port.version
    );
    port.open();
    port.send([0x90, 60, 0x7f]);
  });
  testInputs();
}

function onMidiIn(ev) {
  var arr = [];
  for (var i = 0; i < ev.data.length; i++) {
    arr.push((ev.data[i] < 16 ? "0" : "") + ev.data[i].toString(16));
  }
  console.log("MIDI:", arr.join(" "));
}

function testInputs() {
  console.log("Testing MIDI-In ports...");
  inputs.forEach(function (port) {
    console.log(
      "id:",
      port.id,
      "manufacturer:",
      port.manufacturer,
      "name:",
      port.name,
      "version:",
      port.version
    );
    port.onmidimessage = onMidiIn;
  });
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
