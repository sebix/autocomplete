<?php

$phrase=$_GET['phrase'];

if (!preg_match('/^[a-z]*$/i', $phrase))
	die();

mysql_connect('localhost', 'root');
mysql_select_db('mysql');
$result = mysql_query('SELECT `name` FROM `help_topic` WHERE `name` LIKE \'' . $phrase . '%\''); // mysql commands

$suggestions = '<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE  Klasse [
    <!ELEMENT suggestions (suggestion*)>
    <!ELEMENT suggestion (name)>
]>
<suggestions>';

while($row = mysql_fetch_array($result))
		$suggestions .= '<suggestion>'.$row[0].'</suggestion>';

$suggestions .= '</suggestions>';

header('Content-type: text/xml');
echo $suggestions;
?>
