<?php

namespace app\controllers;

use core\Tone;

class MainController extends AppController {
    
    public function indexAction() {
    
       $this->setMeta(
           'EMOMOE Clothing Brand',
           'EMOMOE Clothing Brand',
           'emomoe, clothing'
       );
    }
}