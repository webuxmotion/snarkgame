<?php
  $title = $title ?? 'Default title';
  $href = $href ?? null;
  $target = $target ?? null;

  $tag = $href ? 'a' : 'button';
  $hrefAttr = $href ? "href='$href'" : null;
  $targetAttr = $target ? "target='$target'" : null;
?>

<<?=$tag?>
  <?=$hrefAttr?>
  <?=$targetAttr?>
  class="button"
>
  <?=$title?>
</<?=$tag?>>