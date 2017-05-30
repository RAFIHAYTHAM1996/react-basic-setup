<!doctype html>
<html>
<head>
  <?php
    require('./lib/Meta.php');
    $meta = new Meta('json/share.json',isset($_GET['u'])?$_GET['u']:'');
    $meta->write();
  ?>
  <meta charset="utf-8">
  <base href="{{BASENAME}}">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no">
  <link rel="stylesheet" type="text/css" href="{{stylesheet}}">
<link rel="apple-touch-icon" sizes="180x180" href="{{ASSET_PATH}}images/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="{{ASSET_PATH}}images/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="{{ASSET_PATH}}images/favicons/favicon-16x16.png">
<link rel="manifest" href="{{ASSET_PATH}}images/favicons/manifest.json">
<link rel="mask-icon" href="{{ASSET_PATH}}images/favicons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="{{ASSET_PATH}}images/favicons/favicon.ico">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="{{ASSET_PATH}}images/favicons/mstile-144x144.png">
<meta name="msapplication-config" content="{{ASSET_PATH}}images/favicons/browserconfig.xml">
<meta name="theme-color" content="#ffffff"></head>
  <body>{{#if vendor}}
  <script type="text/javascript" src="{{vendor}}"></script>{{/if}}
  <script type="text/javascript" src="{{bundle}}"></script>
  </body>
</html>
