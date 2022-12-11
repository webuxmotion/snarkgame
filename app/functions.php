<?php

function importStyles() {
    $files = scandir(WWW . '/dist');

    $html = '';

    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) == 'css') {
            $filePath = "/dist/$file";
            $html .= '<link href="' . $filePath . '" rel="stylesheet">';
        }
    }
    
    return $html;
}

function importScripts() {
    $files = scandir(WWW . '/dist');

    $html = '';

    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) == 'js') {
            $filePath = "/dist/$file";
            $html .= '<script src="' . $filePath . '"></script>';
        }
    }
    
    return $html;
}