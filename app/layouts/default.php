<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Your Name">
  <?=$this::getMeta(); ?>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap" rel="stylesheet">
  
  <?=importStyles()?>
</head>
<body>
  <?=$content?>
  
  <script>
    var serverUrl = "<?=siteUrl()?>";
  </script>
  
  <?=importScripts()?>
  <?=$scripts?>
</body>
</html>
