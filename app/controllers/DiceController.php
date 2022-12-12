<?php

namespace app\controllers;

class DiceController extends AppController {
    
    public function indexAction() {
    
       $this->setMeta(
           'Snark Game',
           'Snark Game, table game',
           'snarkgame, snark, table game'
       );
    }
}