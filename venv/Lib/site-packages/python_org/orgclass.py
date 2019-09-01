#!/usr/bin/env python
# coding=utf-8

# Last modified: <2012-12-11 15:39:16 Tuesday by richard>

# @version 0.1
# @author : Richard Wong
# Email: chao787@gmail.com
# TODO: Need todo, tag, date more func support.
"""
This file contains Org mode's arichtecture, the main datastructure.
"""
import re


class BasicLine(object):
    """
    This is a type for a basic line purpose
    FIXME: find foot note declaration in each line.
    """
    FEATURE = re.compile(r'\A(.*)\n?\Z')

    def __init__(self, content):
        self.m = self.FEATURE.match(content)
        if not self.m:
            raise TypeError

        self.content = content
        self.raw_content = self.m.group(1)

    def __str__(self):
        return self.content


class SpaceLine(BasicLine):
    """
    This is a type for a Empty line purpose
    A line with only whitespace or nothing
    """
    FEATURE = re.compile(ur'\A(\s*)\n?\Z', re.U)

    def __init__(self, content):
        BasicLine.__init__(self, content)


class BasicFuncLine(BasicLine):

    FEATURE = re.compile(ur'\A(#(.*))\n?\Z', re.U)

    def __init__(self, content):
        BasicLine.__init__(self, content)
        self.func_detail = self.m.group(2)


class TitleFuncLine(BasicFuncLine):

    FEATURE = re.compile(ur'\A(#(\+TITLE:(.*)))\n?\Z', re.U | re.I)

    def __init__(self, content):
        BasicFuncLine.__init__(self, content)
        self.title_name = self.m.group(3)


class BeginSrcFuncLine(BasicFuncLine):

    FEATURE = re.compile(ur'\A(#(\+begin_src\s(.*)))\n?\Z', re.U | re.I)

    def __init__(self, content):
        BasicFuncLine.__init__(self, content)
        self.prog_name = self.m.group(3)


class EndSrcFuncLine(BasicFuncLine):

    FEATURE = re.compile(ur'\A(#(\+end_src\s*))\n?\Z', re.U | re.I)

    def __init__(self, content):
        BasicFuncLine.__init__(self, content)


class HeadLine(BasicLine):
    """
    This is the headline of the org mode.
    """
    FEATURE = re.compile(ur'\A((\*+)(\s.+))\n?\Z', re.U)

    def __init__(self, content):
        BasicLine.__init__(self, content)
        self.head_level = len(self.m.group(2))
        self.head_content = self.m.group(3)


class TableLine(BasicLine):
    """
    This is the tableline of the org mode.
    Def:
    Any line with `|` as the first nonwhitespace character is
    considered part of a table.
    """

    FEATURE = re.compile(ur'\A(\s*\|((.*?\|)+)\s*)\n?\Z', re.U)

    def __init__(self, content):
        """
        """
        BasicLine.__init__(self, content)
        self.column = self.m.group(2).split('|')


class OrderLine(BasicLine):
    """
    Ordered list items start with a numeral followed by
    either a period or a right parenthesis.
    such as:
    '1.' or '1)'
    If you want a list to start with a different value (e.g. 20),
    start the text of the item with [@20]12 . Those constructs can be used in
    any item of the list in order to enforce a particular numbering.
    • Description list items are unordered list items, and contain the
    separator '::' to distinguish the description term from the description.
    """

    FEATURE = re.compile(ur'\A(\s*(\d+)([.)])\s(.*))\n?\Z', re.U)

    def __init__(self, content):
        BasicLine.__init__(self, content)
        self.order_style = int(self.m.group(2))
        self.style = self.m.group(3)
        self.order_content = self.m.group(4)


class BulletinLine(BasicLine):
    """
    Unordered list items start with '-', '+', or '*' as bullets.
    """
    FEATURE = re.compile(ur'\A((\s+[+*-]|[+-])\s(.*))\n?\Z', re.U)

    def __init__(self, content):
        # if space is 0 then * is a head line
        BasicLine.__init__(self, content)
        self.bullet_style = self.m.group(2)
        self.bullet_content = self.m.group(3)


class DescriptionLine(BasicLine):
    """
    Description list use ` :: ' to separate the term from the description.
    """
    FEATURE = re.compile(ur'\A((\s+[+*-]|[+-])(.*?)\s::\s.*)\n?\Z', re.U)

    def __init__(self, content):
        # if space is 0 then * is a head line
        BasicLine.__init__(self, content)
        self.description_style = self.m.group(2)
        self.description_content = self.m.group(3)


class FootNoteLine(BasicLine):
    """
    A footnote is defined in a paragraph that is started by a footnote
    marker in square brackets in column 0, no indentation allowed. The
    footnote reference is simply the marker in square brackets, inside
    text.
    """
    FEATURE = re.compile(ur'\A(\[fn:(\w+)\](.*))\n?\Z', re.U)

    def __init__(self, content):
        # if space is 0 then * is a head line
        BasicLine.__init__(self, content)
        self.footnote_name = self.m.group(2)
        self.footnote_content = self.m.group(3)


class LinkLine(BasicLine):
    """
    Once a link in the buffer is complete (all brackets present), Org
    will change the display so that ‘description’ is displayed instead
    of ‘[[link][description]]’ and ‘link’ is displayed instead of
    ‘[[link]]’. Links will be highlighted in the face org-link, which
    by default is an underlined face.
    """
    FEATURE = re.compile(ur'\A(\[\[([^\]]+)\](\[.+\])?\])\n?\Z', re.U)

    def __init__(self, content):
        # if space is 0 then * is a head line
        BasicLine.__init__(self, content)
        self.link = self.m.group(2)
        self.link_name = self.m.group(3)


class TodoItemLine(HeadLine):
    """
    Any headline becomes a todo item when it starts with the word ‘todo’.
    Some method to get todo item list
    """
    FEATURE = re.compile(ur'\A((\*+)\s+(TODO\s.*))\n?\Z', re.U)

    def __init__(self, content, todo_list=['TODO']):

        # if space is 0 then * is a head line
        HeadLine.__init__(self, content)


class OverviewLine(HeadLine):
    """
    To keep the overview over the fraction of subtasks that are already
    completed, insert either ‘[/]’ or ‘[%]’ anywhere in the headline.
    """
    def __init__(self, content):

        # if space is 0 then * is a head line
        HeadLine.__init__(self, content)


class CheckBoxLine(BulletinLine):
    """
    Every item in a plain list (see Section 2.7 [Plain lists], page 4)
    can be made into a checkbox by starting it with the string ‘[ ]’.
    """
    condition1 = ur'(\s+[+*-]\s+\[[ Xx-]\](\s.*)?)'
    condition2 = ur'([+-]\s+\[[ Xx-]\](\s.*)?)'
    FEATURE = re.compile(ur'\A(%s|%s)\n?\Z' % (condition1, condition2), re.U)

    def __init__(self, content):
        BulletinLine.__init__(self, content)
        # self.BoxStatus()


class TagsLine(HeadLine):
    """
    Tags make use of the hierarchical structure of outline trees. If a
    heading has a certain tag, all subheadings will inherit the tag as well.
    """
    FEATURE = re.compile(ur'\A((\*+)((\s.*)??\s\:((\w+\:)+)))\n?\Z', re.U)

    def __init__(self, content):
        HeadLine.__init__(self, content)
        self.Tags = self.m.group(3).split(':')


# orgclass.py ended here
