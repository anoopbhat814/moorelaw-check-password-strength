import math
g=32000000000000  #32 trillions
y=10               #added years 
r=2             # y = 5  if r= 1.189207115002721  , y= 20   , e =78.1 ,p= 6.04=7
y=5
eq1 = (31536000*g)
eq2 = (r**y)-1
eq3 = r-1
eq4 = math.log10(2)

eq5 = (eq1*eq2)/eq3

eq6= math.log10(eq5)

eq7 = eq6/eq4

e =1 + (eq7/eq4)  #entropy

print(e)  #expected output  70.7736 =70.8  p= 5.47=6

p = ( math.log10(2**e) )/( math.log10(7776) )

print(p)