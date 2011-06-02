<?php

$values = array('Ant', 'Answer', 'Amerika', 'Anecdote', 'Antarctic', 'Antisemitism', 'Antelope', 'Antichrists', 'Antilles');

$phrase=$_GET['phrase'];

if (!preg_match('/^[a-z]*$/i', $phrase))
	die();

$suggestions = '<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE  Klasse [
    <!ELEMENT suggestions (suggestion*)>
    <!ELEMENT suggestion (name)>
]>
<suggestions>';

foreach ($values as $value) {
	if (preg_match('/^'.$phrase.'/i', $value)) {
		$suggestions .= '<suggestion>'.$value.'</suggestion>';
	}
}
$suggestions .= '</suggestions>';

header('Content-type: text/xml');
echo $suggestions;
?>
