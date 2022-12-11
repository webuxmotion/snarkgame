<?php

namespace app\controllers;

class PlayController extends AppController {
    
    public function indexAction() {
    
       $this->setMeta(
           'Snark Game',
           'Snark Game, table game',
           'snarkgame, snark, table game'
       );
    }
}