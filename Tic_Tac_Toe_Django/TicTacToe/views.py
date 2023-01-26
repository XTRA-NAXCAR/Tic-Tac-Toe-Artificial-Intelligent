from django.shortcuts import render
import random

def home(request):
    return render(request, 'TicTacToe/home.html')
def play (request):

   if request.GET.get('choose') == 'Random':
       player = random.choice('XOXOXOXOXOXOOXOXOXOXOXOXOXOXOXOXOXOXO')
       if player == 'X':
           computer = 'O'
       else:
           computer = 'X'

   if request.GET.get('choose') == 'X':
       player = 'X'
       computer = 'O'
    
   if request.GET.get('choose') == 'O':
       player = 'O'
       computer = 'X'
    

   return render(request, 'TicTacToe/play.html', {'computer': computer, 'player': player})