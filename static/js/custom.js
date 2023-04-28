let active_tab_id = $(".nav-item").find("a.active").attr("data-attr");

let is_moore_law_enabled = $('.' + active_tab_id + ' [name="Moores_Law"]:checked').val();

let how_many_words, how_many_years, speed_increase, attacker_guess, entropy, y, money,righttab_entropy;
console.log(is_moore_law_enabled);

function showMorreLaw(event) {
    let guess = event.target.value;

    switch (guess) {
        case "1_trillion":
            document.getElementById("has_moore").classList.remove("hide_me");
            document.getElementById("has_moore_right_tab").classList.remove("hide_me");
            break;
        case "12.5":
            document.getElementById("has_moore").classList.remove("hide_me");
            document.getElementById("has_moore_right_tab").classList.remove("hide_me");
            break;
        case "26_million":
            document.getElementById("has_moore").classList.remove("hide_me");
            document.getElementById("has_moore_right_tab").classList.remove("hide_me");
            break;
        default:
            document.getElementById("has_moore").classList.add("hide_me");
            document.getElementById("has_moore_right_tab").classList.add("hide_me");
    }
}

function showInterval(event) {
    let moore_law = event.target.value;
    console.log(event.target.value);
    if (moore_law == "yes") {
        document.getElementsByClassName("speed_increase")[0].style.display = "block";
        document.getElementsByClassName("speed_increase")[1].style.display = "block";
    } else {
        document.getElementsByClassName("speed_increase")[0].style.display = "none";
        document.getElementsByClassName("speed_increase")[1].style.display = "none";



    }
    // document.getElementById("speed_increase").
}
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll("input[name='attacker_guess']").forEach((input) => {
        input.addEventListener('change', showMorreLaw);
    });
    document.querySelectorAll("input[name='Moores_Law']").forEach((input) => {
        input.addEventListener('change', showInterval);
    });

});


function getEnropyRightTab(how_many_years, money, speed_increase) {
    let moore_law = $('.' + active_tab_id + ' input[name="Moores_Law"]:checked').val();


    let data = {
        'how_many_years': how_many_years,
        "money": money,
        "speed_increase": speed_increase,
        "moore_law":moore_law
    };
   
    $.ajax({
        type: 'POST',
        url: "/compute_right_tab_entropy",
        async: false,
        data: data,
        success: function(result) {
            righttab_entropy = result.entropy;
            console.log(righttab_entropy);
            findanswerchracters(result.entropy);

            $('.' + active_tab_id).find("span.entropy").html(result.entropy);
            $('.' + active_tab_id).find(".check_box_value").html(result.entropy);

        }

    });
    return righttab_entropy;
}

function getEnropy(how_many_words) {

    let data = {
        'how_many_words': how_many_words
    };
    console.log(how_many_words);
    $.ajax({
        type: 'POST',
        url: "/compute",
        async: false,
        data: data,
        success: function(result) {
            entropy = result.entropy;

            findanswerchracters(result.entropy);

            $('.' + active_tab_id).find("span.entropy").html(result.entropy);
            $('.' + active_tab_id).find(".check_box_value").html(result.entropy);

        }

    });
    return entropy;
}

function findanswerchracters(e) {
        console.log(active_tab_id);
    //make ajax request to function which will check if 3 boxes selected then get result
    lower_case = $('.' + active_tab_id+ '.lower_case').val();
    upper_case = $('.' + active_tab_id+ '.upper_case').val();
    numbers = $('.' + active_tab_id+ '.numbers').val();
    // special_character = $("#special_character").val();

    if ($('.'+active_tab_id+ '.lower_case').is(':checked') && $('.'+active_tab_id+ '.upper_case').is(':checked') && $('.'+active_tab_id+ '.numbers').is(':checked')) {
        let data = {
            'e': e,
            'lower_case': lower_case,
            'upper_case': upper_case,
            'numbers': numbers
        }
        $.ajax({
            type: 'POST',
            url: "/loweruppernumbers",
            data: data,
            success: function(result) {
                //entropy = result.entropy;
                console.log(result.check_box)
                $('.' + active_tab_id).find(".required_character").html(result.check_box);

            }

        });
    }

}

function getSelectedSpeedIncrease() {
    let speed_increase = $('.' + active_tab_id + ' [name="speed_increase"]:checked').val();
    return speed_increase;
}

//if seelct Has Moore's Law been in affect since that estimate was made? yes
function calculateG(attacker_guess) {
    let g;
    if (attacker_guess == "1_trillion") {
        money = Math.pow(10, 12);
    }

    if (attacker_guess == "12.5") {
        money = 12.5;

    }

    if (attacker_guess == "26_million") {
        money = 26000000;
    }

    let data = {
        'entropy': entropy,
        'money': money
    };
    $.ajax({
        type: 'POST',
        url: "/calculateG",
        async: false,
        data: data,
        success: function(result) {
            g = result.g;

        }

    });
    return g;
}

function getSelectedAttackerGuess() {

    let attacker_guess = $('.' + active_tab_id + ' [name="attacker_guess"]:checked').val();
    let affect = $('.' + active_tab_id + ' [name="affect"]:checked').val();



    if (attacker_guess == "custom") {

        let custom = $('.' + active_tab_id + ' .attacker_guess_text').val();

        let select = $('.' + active_tab_id + ' .select_sym').val();

        if (select == "Million") {
            money = custom * 1000000;
            //console.log(money);
        }

        if (select == "Trillion") {
            money = custom * 1000000000000;
            //console.log(money);

        }

        if (select == "Billion") {
            money = custom * 1000000000;
            // console.log(money);

        }
    }
    if (attacker_guess == "1_trillion" || attacker_guess == "12.5" || attacker_guess == "26_million") {
        if (affect == "yes") {
            money = calculateG(attacker_guess);
            console.log(money);
        } else {
            if (attacker_guess == "1_trillion") {
                money = Math.pow(10, 12);
            }

            if (attacker_guess == "12.5") {
                money = 12500000;

            }

            if (attacker_guess == "26_million") {
                money = 26000000;
            }
        }
    }


    if (attacker_guess == "300_quintillion") {
        money = 300000000000000000000;
    }

    if (attacker_guess == "1_quintillion") {
        money = 1110000000000000000; // Math.pow(1.11, 18);
    }



    return money;
}

function getYears(data) {
    let moore_law = $('.' + active_tab_id + ' input[name="Moores_Law"]:checked').val();

    console.log("moorelaw>>>",moore_law)
    data['moore_law'] = moore_law;
    console.log(data);
    $.ajax({
        type: 'POST',
        url: "/lefttabpass",
        data: data,
        success: function(result) {
            y = result.y;
            // alert(y);
            console.log(result.strength)
            $('.' + active_tab_id).find(".result_passphrase .years_result").html(result.y);

        }

    });
}

function getCharacters(data) {
    console.log("data>>>",data)
    let moore_law = $('.' + active_tab_id + ' input[name="Moores_Law"]:checked').val();
    data['moore_law'] = moore_law;
    console.log(data);
    $.ajax({
        type: 'POST',
        url: "/righttabpass",
        data: data,
        success: function(result) {
            y = result.y;
            // alert(y);
            console.log("resultright>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",result.p)
            $('.' + active_tab_id).find(".result_password .required_character").html(result.p);

        }

    });
}

function findYears() {
    let moore_law = $('.' + active_tab_id + ' input[name="Moores_Law"]:checked').val();
    let speed_increase = $('.' + active_tab_id + ' input[name="speed_increase"]:checked').val();
    let attacker_guess = $('.' + active_tab_id + ' input[name="attacker_guess"]:checked').val();
    let affect = $('.' + active_tab_id + ' input[name="affect"]:checked').val();

}

function intialRequest() {
    //let active_tab_id = $(".nav-item").find("a.active").attr("data-attr");
    console.log(active_tab_id);
    let moore_law = $('.' + active_tab_id + ' input[name="Moores_Law"]:checked').val();
    let speed_increase = $('.' + active_tab_id + ' input[name="speed_increase"]:checked').val();
    let attacker_guess = $('.' + active_tab_id + ' input[name="attacker_guess"]:checked').val();
    let affect = $('.' + active_tab_id + ' input[name="affect"]:checked').val();

    let check_value = [];
    $('.' + active_tab_id + '  input[type=checkbox]').each(function() {

        if ($(this).is(':checked')) {
            check_value.push($(this).val());

        } else {
            const index = check_value.indexOf($(this).val());
            if (index > -1) { // only splice array when item is found
                check_value.splice(index, 1); // 2nd parameter means remove one item only
            }


        }

    })
    console.log(check_value);

}

$(document).ready(function() {


    $("a.nav-link").click(function() {

        active_tab_id = $(this).attr("data-attr");
        console.log(active_tab_id);
    })
    $('input[type=radio]').change(function(event) {

        is_moore_law_enabled = $('.' + active_tab_id + ' [name="Moores_Law"]:checked').val();
        console.log(is_moore_law_enabled);


        if (entropy == "") {
            alert("Please enter entropy");
            event.preventDefault();

        }

    });

    $(".formsubmitbtn").click(function(e) {

        console.log("checkbox>>>>")

        if (active_tab_id == "right_tab") {

            how_many_years = $('.' + active_tab_id + ' .how_many_years').val();
            money = getSelectedAttackerGuess();
            speed_increase = getSelectedSpeedIncrease();
            console.log("speedincrasej>>>",speed_increase);
            if(speed_increase==2){
                how_many_years = how_many_years/2;
            }else if(speed_increase==1.189207115002721){
                how_many_years =how_many_years*2;
            }
            console.log(how_many_years);
            getEnropyRightTab(how_many_years, money, speed_increase);
            
            let intial_data = {
                'money': money,
                'entropy': righttab_entropy,
                'speed_increase': speed_increase
            };
            console.log("chr>>>",intial_data);
            getCharacters(intial_data);
            handlecheckboxright()

        } else {
            how_many_words = $('.' + active_tab_id + ' .how_many_words').val();
            if (how_many_words == "") {
                alert("Enter How many words is your passphrase?");
                $('.' + active_tab_id + ' .how_many_words').focus();
                return false;
                e.preventDefault();
            }
            getEnropy(how_many_words);

            money = getSelectedAttackerGuess();
            speed_increase = getSelectedSpeedIncrease();

            if (is_moore_law_enabled == "yes") {
                let intial_data = {
                    'money': money,
                    'entropy': entropy,
                    'speed_increase': speed_increase
                };
                getYears(intial_data);

            } else {

                let intial_data = {
                    'money': money,
                    'entropy': entropy,
                    'speed_increase': speed_increase
                };
                getYears(intial_data);
            }

            handleChekbox()
        }




        e.preventDefault();

    })



    $('#password_char1').find('input[type=checkbox]').change(function() {

        if (entropy == undefined) {
            alert("Please Enter Entropy");
        }



        let check_value = [];
        $('#password_char1 input[type=checkbox]').each(function() {
            console.log($(this).attr("id"));
            if ($(this).is(':checked')) {
                check_value.push($(this).val());

            } else {
                const index = check_value.indexOf($(this).val());
                if (index > -1) { // only splice array when item is found
                    check_value.splice(index, 1); // 2nd parameter means remove one item only
                }


            }

        })
        console.log(check_value);
        if (check_value.length <= 0) {
            alert("please select atlease one checkbox");
        }

        let data = {
            'check_value': check_value.join(","),
            'entropy': entropy
        }

        $.ajax({
            type: 'POST',
            url: "/unique",
            data: data,
            success: function(result) {


                $('.' + active_tab_id).find(".required_character").html(result.boxes_value);

            }

        });


    });

    function handleChekbox() {

        if (entropy == undefined) {
            alert("Please Enter Entropy");
        }



        let check_value = [];
        console.log("called>>>",check_value);
        $('#password_char1 input[type=checkbox]').each(function() {
            console.log($(this).attr("id"));
            if ($(this).is(':checked')) {
                check_value.push($(this).val());

                console.log("called1>>>",check_value)
                
            }
            else {
                const index = check_value.indexOf($(this).val());
                if (index > -1) { // only splice array when item is found
                    check_value.splice(index, 1); // 2nd parameter means remove one item only
                }
                console.log("called2>>>",check_value)

            }

        })
        
        if (check_value.length <= 0) {
            alert("please select atlease one checkbox");
        }

        let data = {
            'check_value': check_value.join(","),
            'entropy': entropy
        }

        $.ajax({
            type: 'POST',
            url: "/unique",
            data: data,
            success: function(result) {


                $('.' + active_tab_id).find(".required_character").html(result.boxes_value);

            }

        });


    }

    $('#password_char').find('input[type=checkbox]').change(function() {

        if (righttab_entropy == undefined) {
            alert("Please Enter Entropy");
        }



        let check_value = [];
        $('#password_char input[type=checkbox]').each(function() {
            console.log($(this).attr("id"));
            if ($(this).is(':checked')) {
                check_value.push($(this).val());

            } else {
                const index = check_value.indexOf($(this).val());
                if (index > -1) { // only splice array when item is found
                    check_value.splice(index, 1); // 2nd parameter means remove one item only
                }


            }

        })
        console.log(check_value);
        if (check_value.length <= 0) {
            alert("please select atlease one checkbox");
        }

        let data = {
            'check_value': check_value.join(","),
            'entropy': righttab_entropy
        }

        $.ajax({
            type: 'POST',
            url: "/unique",
            data: data,
            success: function(result) {


                $('.' + active_tab_id).find(".required_character1").html(result.boxes_value);

            }

        });


    });

    function handlecheckboxright(){

        if (righttab_entropy == undefined) {
            alert("Please Enter Entropy");
        }



        let check_value = [];
        $('#password_char input[type=checkbox]').each(function() {
            console.log($(this).attr("id"));
            if ($(this).is(':checked')) {
                check_value.push($(this).val());

            } else {
                const index = check_value.indexOf($(this).val());
                if (index > -1) { // only splice array when item is found
                    check_value.splice(index, 1); // 2nd parameter means remove one item only
                }


            }

        })
        console.log(check_value);
        if (check_value.length <= 0) {
            alert("please select atlease one checkbox");
        }

        let data = {
            'check_value': check_value.join(","),
            'entropy': righttab_entropy
        }

        $.ajax({
            type: 'POST',
            url: "/unique",
            data: data,
            success: function(result) {


                $('.' + active_tab_id).find(".required_character1").html(result.boxes_value);

            }

        });


    };

    /*  $('.'+active_tab_id+ " .moores_law").change(function(){

            
             speed_increase = getSelectedSpeedIncrease();
                            money = getSelectedAttackerGuess();
                           let intial_data ={'money':money,
                    'entropy':entropy,
                    'speed_increase':speed_increase
                       };
                       getYears(intial_data);

     })*/



})