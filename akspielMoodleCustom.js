/*
Theme Name: Blue Moodle Child
Description: Custom JS for Moodle
Author: Amy Spielmaker
Author URL: https://akspiel.com/
*/
$(document).ready(function () {
  
  //adding class to custom script and style box
  $('.block_html:contains("Custom script and style")').addClass("scriptBox");
  
  //adding class to body if all sections on one page
  $("body.path-course-view div.course-content > ul.topics > li.section:not(#section-0) .content > ul.section").parents("body").addClass("aks-one-page");
  
  //adding classes to sidebar depending on what's there
  $("#block-region-side-pre").each(function () {
    var $this = $(this);
    if ($this.children("section").length > 1) {
      $this.parent("section").addClass("yesSidebox");
      $this.parent("section").prev("#region-main").addClass("visibleBlocks");
      $("section.visibleBlocks").parents("#region-main-box").addClass("visibleBlocks-box");
    } else {
      $this.parent("section").addClass("noSidebox");
      $this.parent("section").prev("#region-main").addClass("fullMain");
      $("section.fullMain").parents("#region-main-box").addClass("fullMain-box");
    }
  });
  
  //adding class to main for full width
  $("#region-main.fullMain").parents("#region-main-settings-menu").addClass("fullMain");
  
  //adding class to body of single section
  $(".single-section").parents("body").addClass("single-section-view");

  //adding class to h4 list item
  $("li.section ul.section li:not(:first-child) h4").parents("li.activity.label").addClass("headMove");
  
  //checkbox if not a heading needs to be moved up
  $("div.single-section ul.section > li:nth-child(1)").not(":has(h4)").parents("div.content").addClass("checkUp");

  //changing navigation arrows
  $("#region-main .activity-navigation a#prev-activity-link").each(function () {
    var navArrow = $(this).html().replace(/◀︎|◄/g, "");
    $(this).html(navArrow);
  });
  $("#region-main .activity-navigation a#next-activity-link").each(function () {
    var navArrow = $(this).html().replace(/▶︎|►/g, "");
    $(this).html(navArrow);
  });

  //separating topic word from rest of title for front page display
  $("ul.topics li.section h3.section-title a").each(function () {
    $(this).html(
      $(this).text().replace(/^(.+?):/, '<span class="aks-topic-before">$&</span>')
    );
  });

  //adding click even to topics on main page
  $("#page-course-view-topics:not(.single-section-view):not(.editing) li.section:not(#section-0) .section-title a").each(function () {
    var topicLink = $(this).attr("href");
    $(this).parents("li.section").append('<a class="overlayLink" tabindex="-1" href="' + topicLink + '"></a>');
  });

  //if it's not a link add a class
  $("#page-course-view-topics li.section h3.section-title").not(":has(a)").parents("li.section").addClass("restricted");

  //making gradebook more usable for teachers
  $(".path-grade-report-grader .gradeparent table .header.range.cell.c0, .path-grade-report-grader .gradeparent table .topleft.cell.c0").attr("colspan", "2");

  //adding quiz paramaters
  $("#page-mod-quiz-view .box.quizinfo").each(function () {
    if ($(this).is(':contains("Attempts")')) {
    } else {
      $(this).prepend("<p>Attempts allowed: Unlimited</p>");
    }
    if ($(this).is(':contains("Time limit")')) {
    } else {
      $(this).append("<p>Time limit: Unlimited</p>");
    }
  });

  //setting row heights in the quizzes for short answer quiz questions
  $(".formulation .ablock textarea").each(function () {
    var rownum = $(this).attr("rows");
    var irownum = parseInt(rownum);
    if (irownum === 5) {
      $(this).closest(".formulation").addClass("aks-short-answer");
      $(this).attr("rows", "3");
    }
  });

  //changing language for adding posts
  $("#page-mod-forum-view #region-main .p-t-1 .btn-primary").text("Add a new post");

  //improving forum grade display
  $('a.gradeitemheader:contains("Whole forum grade for")').each(function () {
    $(this).html(function () {
      return $(this).html().replace("Whole forum grade for", "");
    });
  });

  //H5P
  $(".h5p-player").on("load", function () {
    // $(".h5p-iframe").on("load", function() {
    var innerframe = $(".h5p-player").contents().find(".h5p-iframe");
    let head = $(innerframe).contents().find("head");
    let css =
      '<style>.h5p-interactive-book-chapter {padding: 20px; width: auto;} .h5p-interactive-book-chapter .questionset {padding-left: 1em; padding-right: 1em;} .h5p-interactive-book-chapter .h5p-question-buttons.h5p-question-visible {width: 100%;} p {line-height: 1.5; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; color: #333;} p a:link, p a:visited, li a:link, li a:visited {color: #305aa5;} p a:hover, p a:active, li a:hover, li a:active {color: #1f3a6a;} .h5p-advanced-text ul > li, .h5p-advanced-text ol > li {margin: 0 0 5px 1.5em;} h3 {margin-bottom: 5px;}</style>';
    $(head).append(css);
    // });
  });
}); //end jquery
//amy