// This is the js for part1 of the Experiment 2
// This function defines the wavesurfer waveform and its related information
var wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#176696",
  barHeight: 2,
  barGap: 1,
  height: 400,
  backgroundColor: "#f5f5f5",
  normalize: "true",
});
function clearcontent(element) {
  element.value = "";
}

// When page is loaded load timeline
wavesurfer.on("ready", function () {
  var timeline = Object.create(WaveSurfer.Timeline);

  timeline.init({
    wavesurfer: wavesurfer,
    container: "#waveform-timeline",
  });
});

// This function provides zoom for the experiment
function zoom(elem) {
  wavesurfer.zoom(elem.value);
}

// This function handles play button
function playButton() {
  wavesurfer.playPause();
}

function LoadExperiment(item) {
  loadExpFrame(item.value);
}

var content1, content2, content3, content4;
var content1ph, content2ph, content3ph, content4ph;

// This function preloads all the text files
function preload() {
  content1 = loadStrings("wav/ex1.txt");
  content2 = loadStrings("wav/ex2.txt");
  content3 = loadStrings("wav/ex3.txt");
  content4 = loadStrings("wav/ex4.txt");
  content1ph = loadStrings("wav/ex1.phn.ap");
  content2ph = loadStrings("wav/ex2.phn.ap");
  content3ph = loadStrings("wav/ex3.phn.ap");
  content4ph = loadStrings("wav/ex4.phn.ap");
}

function setup() {
  noCanvas();
}

//This function changes content of the experiment on changing the experiment number
function loadExpFrame(expnum = 0) {
  if (expnum != 0) {
    document.getElementById("SelectLoad").style.visibility = "visible";
    document.getElementById("lang").value = expnum;
    if (expnum == 1) {
      addpage(expnum);
      wavesurfer.load("wav/ex1.wav");
      document.getElementById("utterance").innerHTML = content1[0];
      document.getElementById("transliteration").innerHTML = content1[1];
      document.getElementById("syllables").innerHTML = content1[2];
      document.getElementById("phonemes").innerHTML = content1[3];
    }

    if (expnum == 2) {
      addpage(expnum);
      wavesurfer.load("wav/ex2.wav");
      document.getElementById("utterance").innerHTML = content2[0];
      document.getElementById("transliteration").innerHTML = content2[1];
      document.getElementById("syllables").innerHTML = content2[2];
      document.getElementById("phonemes").innerHTML = content2[3];
    }

    if (expnum == 3) {
      addpage(expnum);
      wavesurfer.load("wav/ex3.wav");
      document.getElementById("utterance").innerHTML = content3[0];
      document.getElementById("transliteration").innerHTML = content3[1];
      document.getElementById("syllables").innerHTML = content3[2];
      document.getElementById("phonemes").innerHTML = content3[3];
    }

    if (expnum == 4) {
      addpage(expnum);
      wavesurfer.load("wav/ex4.wav");
      document.getElementById("utterance").innerHTML = content4[0];
      document.getElementById("transliteration").innerHTML = content4[1];
      document.getElementById("syllables").innerHTML = content4[2];
      document.getElementById("phonemes").innerHTML = content4[3];
    }
  }
  if (expnum == 0) {
    hideDiv();
  }
}

// This function handles the verification of the value entered and also provides error handling
function verify(elem, result) {
  if (elem.options[elem.selectedIndex].value != result) {
    window.alert("Invalid choice. Try again...");
    elem.selectedIndex = 0;
  }
}

// This function resets table and the experiment page
function reset_table() {
  var table = document.getElementById("Subword");
  var rows = table.getElementsByTagName("tr");
  var lengt = rows.length;
  for (var i = 1; i < lengt; i++) {
    table.deleteRow(1);
  }
}

// This function add playbacks and add buttons on the panel for playing the specific part of wav file.
function addpage(expnum) {
  var table = document.getElementById("Subword");
  reset_table();
  if (expnum == 1) {
    console.log(content1ph.length);

    for (var itr = 0; itr < content1ph.length - 1; itr++) {
      table.appendChild((tr = document.createElement("tr")));
      var fields = content1ph[itr].split(" ");

      for (var i = 0; i < 6; i++) {
        tr.appendChild((td = document.createElement("td")));

        if (i == 0) {
          var begin = 0.000066375 * parseFloat(fields[1]);
          var end = 0.000066375 * parseFloat(fields[2]);
          td.innerHTML =
            '<button type="button" style="width:120px;" onclick="wavesurfer.play(' +
            begin +
            "," +
            end +
            ')" class="btn btn-info" value = ' +
            fields[0] +
            ">" +
            fields[0] +
            "</button>";
        }

        if (i == 1 || i == 2) {
          td.innerHTML = fields[i];
        }

        if (i == 3 || i == 4 || i == 5) {
          if (i == 3) {
            var option =
              "Select-Extn-type:None:Voiced:Unvoiced:Unvoiced-Unasp-Plosive:Unvoiced-Asp-Plosive:Voiced-Unasp-Plosive:Voiced-Asp-Plosive";
            select_fields = option.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 4) {
            var manner_list =
              "Select-manner:None:Stop:Nasal:Semivowel:Short-Vowel:Long-Vowel:Diphthong:Fricative";

            select_fields = manner_list.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 5) {
            var placelist =
              "Select-place:None:Velar:Palatal:Alveolar:Retroflex:Dental:Labial:Front-High:Front-Mid:Central-Low:Back-High:Back-Mid";

            select_fields = placelist.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }
        }
      }
    }
  }

  if (expnum == 2) {
    console.log(content2ph);

    for (var itr = 0; itr < content2ph.length - 1; itr++) {
      table.appendChild((tr = document.createElement("tr")));
      var fields = content2ph[itr].split(" ");

      for (var i = 0; i < 6; i++) {
        tr.appendChild((td = document.createElement("td")));

        if (i == 0) {
          var begin = 0.000066375 * parseFloat(fields[1]);
          var end = 0.000066375 * parseFloat(fields[2]);
          td.innerHTML =
            '<button type="button" style="width:120px;" onclick="wavesurfer.play(' +
            begin +
            "," +
            end +
            ')" class="btn btn-info" value = ' +
            fields[0] +
            ">" +
            fields[0] +
            "</button>";
        }

        if (i == 1 || i == 2) {
          td.innerHTML = fields[i];
        }

        if (i == 3 || i == 4 || i == 5) {
          if (i == 3) {
            var option =
              "Select-Extn-type:None:Voiced:Unvoiced:Unvoiced-Unasp-Plosive:Unvoiced-Asp-Plosive:Voiced-Unasp-Plosive:Voiced-Asp-Plosive";
            select_fields = option.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 4) {
            var manner_list =
              "Select-manner:None:Stop:Nasal:Semivowel:Short-Vowel:Long-Vowel:Diphthong:Fricative";

            select_fields = manner_list.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 5) {
            var placelist =
              "Select-place:None:Velar:Palatal:Alveolar:Retroflex:Dental:Labial:Front-High:Front-Mid:Central-Low:Back-High:Back-Mid";

            select_fields = placelist.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }
        }
      }
    }
  }

  if (expnum == 3) {
    console.log(content1ph.length);

    for (var itr = 0; itr < content3ph.length - 1; itr++) {
      table.appendChild((tr = document.createElement("tr")));
      var fields = content3ph[itr].split(" ");

      for (var i = 0; i < 6; i++) {
        tr.appendChild((td = document.createElement("td")));

        if (i == 0) {
          var begin = 0.000066375 * parseFloat(fields[1]);
          var end = 0.000066375 * parseFloat(fields[2]);
          td.innerHTML =
            '<button type="button" style="width:120px;" onclick="wavesurfer.play(' +
            begin +
            "," +
            end +
            ')" class="btn btn-info" value = ' +
            fields[0] +
            ">" +
            fields[0] +
            "</button>";
        }

        if (i == 1 || i == 2) {
          td.innerHTML = fields[i];
        }

        if (i == 3 || i == 4 || i == 5) {
          if (i == 3) {
            var option =
              "Select-Extn-type:None:Voiced:Unvoiced:Unvoiced-Unasp-Plosive:Unvoiced-Asp-Plosive:Voiced-Unasp-Plosive:Voiced-Asp-Plosive";
            select_fields = option.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 4) {
            var manner_list =
              "Select-manner:None:Stop:Nasal:Semivowel:Short-Vowel:Long-Vowel:Diphthong:Fricative";

            select_fields = manner_list.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 5) {
            var placelist =
              "Select-place:None:Velar:Palatal:Alveolar:Retroflex:Dental:Labial:Front-High:Front-Mid:Central-Low:Back-High:Back-Mid";

            select_fields = placelist.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }
        }
      }
    }
  }

  if (expnum == 4) {
    console.log(content1ph.length);

    for (var itr = 0; itr < content4ph.length - 1; itr++) {
      table.appendChild((tr = document.createElement("tr")));
      var fields = content4ph[itr].split(" ");

      for (var i = 0; i < 6; i++) {
        tr.appendChild((td = document.createElement("td")));

        if (i == 0) {
          var begin = 0.000066375 * parseFloat(fields[1]);
          var end = 0.000066375 * parseFloat(fields[2]);
          td.innerHTML =
            '<button type="button" style="width:120px;" onclick="wavesurfer.play(' +
            begin +
            "," +
            end +
            ')" class="btn btn-info" value = ' +
            fields[0] +
            ">" +
            fields[0] +
            "</button>";
        }

        if (i == 1 || i == 2) {
          td.innerHTML = fields[i];
        }

        if (i == 3 || i == 4 || i == 5) {
          if (i == 3) {
            var option =
              "Select-Extn-type:None:Voiced:Unvoiced:Unvoiced-Unasp-Plosive:Unvoiced-Asp-Plosive:Voiced-Unasp-Plosive:Voiced-Asp-Plosive";
            select_fields = option.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 4) {
            var manner_list =
              "Select-manner:None:Stop:Nasal:Semivowel:Short-Vowel:Long-Vowel:Diphthong:Fricative";

            select_fields = manner_list.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }

          if (i == 5) {
            var placelist =
              "Select-place:None:Velar:Palatal:Alveolar:Retroflex:Dental:Labial:Front-High:Front-Mid:Central-Low:Back-High:Back-Mid";

            select_fields = placelist.split(":");

            select_option =
              '<select id="Extn_type" onchange=verify(this,"' +
              fields[i] +
              '")>';

            for (
              var field_itr = 0;
              field_itr < select_fields.length;
              field_itr++
            ) {
              select_option +=
                "<option value=" +
                select_fields[field_itr] +
                " name=" +
                field_itr +
                ">" +
                select_fields[field_itr] +
                "</option>";
            }

            select_option += "</select>";

            td.innerHTML = select_option;
          }
        }
      }
    }
  }
}

function hideDiv() {
  document.getElementById("SelectLoad").style.visibility = "hidden";
}
