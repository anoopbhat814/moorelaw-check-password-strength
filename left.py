import math
from datetime import date
todays_date = date.today()
curent_year = todays_date.year
a= 51.7   #e
r= 1.41421356
g =300000000000000000000
eq1= (1-r)
eq2 = (2) ** (a-1)
eq3 = (31536000*g)/(1-r)
eq4= 31536000*g
eq5 = math.log10(r)
eq6 = (eq1*(eq2-eq3))/eq4
eq7 = math.log10(-eq6)
y = eq7/eq5
print(y)  # round off to hearest half whole number  # this value is years 

#put  answer bits as a = e

#second part  

#g= How many guesses per second (300 quatilion )
#r=  2 (if doubles every year )At what interval  does the atackers speed increase ?  (under root 2)



#password strength  a= e

#x = ( math.log10(2**a) )/(math.log10(62))    #how many chracters
#print(x) #a passord with equibalnet strenth of _ bits would reuiqre (x) chracters


#if unchecked chracter strenth or any checkbox  then give error 



#if g selected from first 3  and yes moore law  been in effect since that estimate was made

#g = 1 trilion*sqrt2^2023-2013 , put g in abvoe equation
#g = 10**12 * ( math.sqrt(2) ** (2023-2013) )
#g= a = 12.5 * (math.sqrt(2) ** 2023-2018)
#g= a = 26000000 * (math.sqrt(2) ** 2023-2020)

#  12.5 * (1.4142135623730951 ** 5)
# 26000000 *(1.4142135623730951 ** 3)

#case for r if used r for 2 year time period  for left tab multiply Y by 2  after calcualtion

#case for r if used r for 2 year time period  for right tab divide Y by 2  before calcualtion

#case for r if used r for 6 months time period  for left tab divide Y by 2  before calcualtion

#case for r if used r for  6 months time period  for right tab multiply Y by 2  before calcualtion


#if moore law no then equation is  y = ( (2**e-1) ) / ( (g*3.1536) * (10**7) )  #left tab

#( (2**76.5) ) / ( (1000000000000*3.1536) * (10**7) )


#-----------LEFT TAB-----

e=50.7
g=300 qauntilion
r= math.sqrt(2)