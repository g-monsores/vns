// Navbar menu 
// const openButton = document.getElementById('open-sidebar-button')
// const navbar = document.getElementById('navbar')
// const overlay = document.getElementById('overlay')

// const media = window.matchMedia("(width < 640px)")

// media.addEventListener('change', (e) => updateNavbar(e))

// function updateNavbar(e){
//   const isMobile = e.matches
//   console.log(isMobile)
//   if(isMobile){
//     navbar.setAttribute('inert', '')
//   }
//   else{
//     // desktop device
//     navbar.removeAttribute('inert')
//   }
// }

// function openSidebar(){
//   navbar.classList.add('show')
//   openButton.setAttribute('aria-expanded', 'true')
//   navbar.removeAttribute('inert')
//   $('#overlay').show()
// }

// function closeSidebar(){
//   navbar.classList.remove('show')
//   openButton.setAttribute('aria-expanded', 'false')
//   navbar.setAttribute('inert', '')
//   $('#overlay').hide()
// }

const openButton = $('#open-sidebar-button');
const navbar = $('#navbar');
const overlay = $('#overlay');

const media = window.matchMedia("(width < 640px)");

media.addEventListener('change', (e) => updateNavbar(e));

function updateNavbar(e){
  const isMobile = e.matches;
  console.log(isMobile);
  if(isMobile){
    navbar.attr('inert', '');
  }
  else{
    // desktop device
    navbar.removeAttr('inert');
  }
}

function openSidebar(){
  navbar.addClass('show');
  openButton.attr('aria-expanded', 'true');
  navbar.removeAttr('inert');
  overlay.show();
}

function closeSidebar(){
  navbar.removeClass('show');
  openButton.attr('aria-expanded', 'false');
  navbar.attr('inert', '');
  overlay.hide();
}

// For Bookmark Links
// const navLinks = document.querySelectorAll('nav a')
// navLinks.forEach(link => {
//   link.addEventListener('click', () => {
//     closeSidebar()
//   })
// })

updateNavbar(media)

// Calculator

// $("#calorie-calculator").submit(function (e) {
//     e.preventDefault();
//     displayCals();
//     calcDailyMacros();
// });


$("#calorie-calculator").on("submit",function(e){
    e.preventDefault();
    displayCals();
    calcDailyMacros();
});

$('#clear').on('click', function () {
    $(".cal-text").remove();
    clearValues();
});

$('#macros').   click(function(){
    calcDailyMacros();
})

$('input[name="macro-type"]').click(function(){
    calcDailyMacros();
})

function submitValues(){
    
}

function refreshGrid(){
    $('#calculator-grid').addClass("show")
    $('.container-2').fadeIn('fast');
}

function clearValues(){
    // refreshGrid(clear)
    $('#calorie-calculator')[0].reset();
    $('#macro-calculator')[0].reset();
    $(".calorie-calculator-btn").fadeIn('fast');
    // $(".calorie-result").hide();
}

function displayCals(){
    refreshGrid();
    $('html, body').animate({
        scrollTop: $("#results").offset().top - 160
    }, 2000);
    // $(".calorie-calculator-btn").hide();
    // $(".calorie-calculator-result").fadeIn("fast");
    var cal = calcDailyCals();   
    if(cal){
        $(".cal-text").remove();
        $('.calorie-result').append('<h3 class="cal-text">Estimativa de calorias diárias: ' + cal + "Kcal</h3>").fadeIn('fast')
    } 
}

function calcDailyCals() {
    let age = parseInt($("#age").val());
    let sex = $('input[name="sex"]:checked').val();
    let weight = parseFloat($("#weight").val());
    let height = parseFloat($("#inches").val());
    let activity = parseFloat($("#activity_level").val());
    let goal = parseFloat($("#gain_loss_amount").val());

    let result;

    if (sex === "male") {
        result =
        ((10.0 * weight + 6.25* height - 5.0 * age) + 5.0) * activity;
    } else {
        result =
        ((10.0 * weight + 6.25* height - 5.0 * age) - 161.0) * activity;
    }

    return Math.round(result * goal);
}

function calcDailyMacros() {
    let macrotype = $('input[name="macro-type"]:checked').val();
    let result = calcDailyCals();

    if (macrotype==="balanced"){
        c_weight=0.6;
        f_weight=0.13;
        p_weight=0.27;
    }
    else if (macrotype==="low-fat"){
        c_weight=0.6;
        f_weight=0.1;
        p_weight=0.3;
    }
    else if (macrotype==="low-carb"){
        c_weight=0.35;
        f_weight=0.3;
        p_weight=0.35;
    }
    else{
        c_weight=0.4;
        f_weight=0.2;
        p_weight=0.4;
    }

    if(result){
        carbs = (result * c_weight) / 4;
        protein = (result * p_weight) / 4;
        fat = (result * f_weight) / 9;
        $("#carbs").val(Math.round(carbs)+"g");
        $("#protein").val(Math.round(protein)+"g");
        $("#fat").val(Math.round(fat)+"g"); 
    }
    else{
        $('#calorie-calculator')[0].reset();
    }
}