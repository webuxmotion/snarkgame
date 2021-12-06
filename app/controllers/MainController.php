<?php

namespace app\controllers;

use core\Tone;

class MainController extends AppController {
    
    public function indexAction() {
    
       $this->setMeta(
           'Snark Game',
           'Snark Game, table game',
           'snarkgame, snark, table game'
       );
    }
}