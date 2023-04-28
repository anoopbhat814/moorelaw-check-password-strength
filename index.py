from flask import Flask, render_template
from flask import jsonify
import json
from flask import request
import math
from datetime import date
from decimal import Decimal, ROUND_HALF_UP
todays_date = date.today()
curent_year = todays_date.year
app = Flask(__name__)

def round_half_up(x: float, num_decimals: int) -> float:
    if num_decimals < 0:
        raise ValueError("Num decimals needs to be at least 0.")
    target_precision = "1." + "0" * num_decimals
    rounded_x = float(Decimal(str(x)).quantize(Decimal(target_precision), ROUND_HALF_UP))
    return rounded_x

@app.route("/")
def index():
   
   return render_template("home.html")

@app.route('/support', methods=('GET', 'POST'))
def support():
   return render_template("support.html")

@app.route('/compute', methods=('GET', 'POST'))
def compute():
   p = request.form['how_many_words']

   #caclulating log
   power = 7776 ** int(p)
   entropy = math.log2(power)
   entropy = round(entropy, 2)
   entropy = round_half_up(entropy, 1)
   return jsonify({'entropy':entropy})




@app.route('/test', methods=('GET', 'POST'))
def test():
   money = request.form['money']
   entropy = request.form['entropy']
   speed_increase = request.form['speed_increase']
   entropy_minus = float(entropy)-1
 
   power_of_eight = float(pow(2,entropy_minus))

   lg = float(pow(2,entropy_minus));
#
   top_sam =(1-float(speed_increase))*(power_of_eight-31536000*float(money))
   top_sam_dividtion = top_sam/31536000*float(money)
   find_log = math.log10(top_sam_dividtion)
   y = find_log/math.log10(float(speed_increase))

   power_often = pow(10,7)
   power_ofy = pow(float(speed_increase),y)
   years = (float(money)*3.15369*float(power_often))*(1-float(power_ofy))
   strength =round( float(years)/1-float(speed_increase),2) 
   return jsonify({'strength':strength,'y':y})

#moorelaw in affect since  that estimate was made 
@app.route('/calculateG', methods=('GET', 'POST'))
def calculateG():
    #a = float(request.form['entropy'])
    g = float(request.form['money'])
    sqrt = math.sqrt(2)
    if (g==1000000000000):
        year_value = curent_year-2013
        g = g *( sqrt ** year_value )
    elif (g==12.5):
        year_value = curent_year-2018
        g=g * (sqrt ** year_value)
    elif (g == 26000000):
        year_value = curent_year-2020
        g= g * (sqrt ** year_value)

    return jsonify({'g':g})


@app.route('/compute_right_tab_entropy', methods=('GET', 'POST'))
def compute_right_tab_entropy():
    y = float(request.form['how_many_years'])  #10
    g = float(request.form['money'])           # 32million
    r = float(request.form['speed_increase'])  #sqaure root of 2
    print("g,a,r>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",g,y,r)
    eq1 = (31536000*g)
    eq2 = ( (r**y) -1 )
    eq3 = r-1
    eq4 = math.log10(2)
    eq5 = (eq1*eq2)/eq3
    print("eq5>>",eq5)
    eq6= math.log10(eq5)
    eq7 = eq6/eq4
    e =1 + (eq7)
    e= round_half_up(e, 1)
    print("entropyright>>",e)
    return jsonify({'entropy':e})

@app.route('/righttabpass', methods=('GET', 'POST'))
def rightTabPassphrase():
    g = float(request.form['money'])
    a = float(request.form['entropy'])
    r = float(request.form['speed_increase'])
    
    if(request.form['moore_law']=="yes"):
        p = ( math.log10(2**a) )/( math.log10(7776) ) #a=e from above function
    else:
        eq1= math.log10(31536000*g*a)   #a=y
        eq2= math.log10(2)
        p= 1+( eq1/eq2 )
    print("p>>>",p)
    p=round(p)
    return jsonify({'p':p})    




@app.route('/lefttabpass', methods=('GET', 'POST'))
def leftTabPassphrase():
    g = float(request.form['money'])
    a = float(request.form['entropy'])
    r = float(request.form['speed_increase'])
    
    if(request.form['moore_law']=="yes"):
        eq1= (1-r)
        eq2 = (2) ** (a-1)
        eq3 = (31536000*g)/(1-r)
        eq4= 31536000*g
        eq5 = math.log10(r)
        eq6 = (eq1*(eq2-eq3))/eq4
        eq7 = math.log10(-eq6)
        y = eq7/eq5
        print(y)
        if(r==2):
            y = y*2    #y right tab do before calcualtion
        elif(r==1.189207115002721):   
            y =y/2    #right tab do before calcualtion
    else:
        a = a-1
        eq1= 2**a
        print(eq1)
        eq2= g*3.1536
        print(eq2)
        eq3 = 10**7
        print(eq3)
        eq4 = eq2 * eq3
        print(eq4)
        y =  eq1/eq4
        #g =  ((2**76.55))  / ( (1000000000000*3.1536) * (10**7) )
        g = ( (2**76.5) ) / ( (1000000000000*3.1536) * (10**7) )
        print(y)
        print(g)
    y = round(y)
    return jsonify({'y':y})


#***************************************** when select no moorelaw ***************************

@app.route('/notab', methods=('GET', 'POST'))
def notab():
   money = request.form['money']
   entropy = request.form['entropy']
   entropy_minus = float(entropy)-1
   power_often = math.pow(10,7)
   powerof_entropy = math.pow(2,float(entropy_minus))
   y = float(money)*3.1536*float(power_often)
   years = round(float(powerof_entropy)/float(y),2)
 
   return jsonify({'years':years})



#################################################

# @app.route('/checkbox', methods=('GET', 'POST'))
# def checkbox():
#    y = request.form['y']
#    entropy = request.form['entropy']
#    check_box = float(entropy)/math.log2(95)
#    return jsonify({'check_box':check_box})

#******************************************************
@app.route('/loweruppernumbers', methods=('GET', 'POST'))
def loweruppernumbers():
   e = request.form['e']
   lower_case = request.form['lower_case']
   upper_case = request.form['upper_case']
   numbers = request.form['numbers']
   #special_character = request.form['special_character']
   if(lower_case=="1" and  upper_case=="2" and numbers=="3"):
    check_box = float(e)/math.log2(62)
   check_box = round(check_box)
   return jsonify({'check_box':check_box})


   
#******************************************unique ***********************************

@app.route('/unique', methods=('GET', 'POST'))
def unique():
   #print("******")
   #print(request.form["check_value"])
   e = request.form['entropy']

   print("e>>>",e)
   e=2**float(e)
   e=round(e)
   selected_check = request.form["check_value"]
   selected_check = selected_check.split(",")
   
   print("e2>>>",e)
   #1, lower case, 2 uppercae ,3 number ,4 special charcter
   boxes_value =False
   if ('1' in selected_check) or ('2' in selected_check):
       boxes_value = math.log2(float(e))/math.log2(26)   # e1= math.log2((2**51.7))/math.log2(69)
   if ('3' in selected_check):
       boxes_value = math.log2(float(e))/math.log2(10)

   if ('4' in selected_check):
       boxes_value = math.log2(float(e))/math.log2(33)

   if ('1' in selected_check) and ('2' in selected_check):  #lower and uppper
       boxes_value = math.log2(float(e))/math.log2(52)

   if (('1' in selected_check) or ('2' in selected_check)) and ('3' in selected_check):  #lowercase or upppercase and numbers
       boxes_value = math.log2(float(e))/math.log2(36)

   if (('1' in selected_check) or ('2' in selected_check)) and ('4' in selected_check):  #lowercase or upppercase and special character
       boxes_value = math.log2(float(e))/math.log2(59)
   
   if ('3' in selected_check) and ('4' in selected_check):  #numbers and special character
       boxes_value = math.log2(float(e))/math.log2(43)

   if ('1' in selected_check) and ('2' in selected_check) and ('3' in selected_check):  #lowercase and and uppercase and special character
       boxes_value = math.log2(float(e))/math.log2(62)

   if ('1' in selected_check) and ('2' in selected_check) and ('4' in selected_check):  #lowercase and and uppercase and special character
       boxes_value = math.log2(float(e))/math.log2(85)

   if (('1' in selected_check) or ('2' in selected_check)) and ('3' in selected_check) and ('4' in selected_check):  #lowercase and or uppercase and and numbers special character
       boxes_value = math.log2(float(e))/math.log2(69)

   if ('1' in selected_check) and ('2' in selected_check) and ('3' in selected_check) and ('4' in selected_check):
       boxes_value = math.log2(float(e))/math.log2(95)
   print("boxvalues>>>",boxes_value) 
   boxes_value=round_half_up(boxes_value, 0)
#    boxes_value = round(boxes_value)    
  
   return jsonify({'boxes_value':boxes_value})
if __name__ == '__main__':
   app.run(debug=True)     

