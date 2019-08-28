#!/usr/bin/env python2
# coding=utf-8

# Last modified: <2012-12-11 15:40:53 Tuesday by richard>

# @version 0.1
# @author : Richard Wong
# Email: chao787@gmail.com
"""
This file is used for test orgclass used.
"""
import unittest

from python_org.orgclass import SpaceLine
from python_org.orgclass import BasicFuncLine
from python_org.orgclass import TitleFuncLine
from python_org.orgclass import BeginSrcFuncLine
from python_org.orgclass import EndSrcFuncLine
from python_org.orgclass import HeadLine
from python_org.orgclass import TableLine
from python_org.orgclass import OrderLine
from python_org.orgclass import BulletinLine
from python_org.orgclass import DescriptionLine
from python_org.orgclass import FootNoteLine
from python_org.orgclass import LinkLine
from python_org.orgclass import TodoItemLine
from python_org.orgclass import CheckBoxLine
from python_org.orgclass import TagsLine


class OrgClassTestCase(unittest.TestCase):

    def test_SpaceLine_True(self):
        test_lines = [' ', '\t', '\n', ' \t\n\t\n   ']
        for line in test_lines:
            self.assertEqual(line, str(SpaceLine(line)))

    def test_SpaceLine_Raises(self):
        test_lines = ['aa', 'aa\t', 'aa  ', '  aa   ', '  aa']
        for line in test_lines:
            self.assertRaises(TypeError, SpaceLine, line)

    def test_BasicFuncLine_True(self):
        test_lines = ['# ', '#\t', '#+1']
        for line in test_lines:
            self.assertEqual(line, str(BasicFuncLine(line)))

    def test_BasicFuncLine_Raises(self):
        test_lines = ['aa', 'aa\t', 'aa  ', '  aa   ', '  aa']
        for line in test_lines:
            self.assertRaises(TypeError, BasicFuncLine, line)

    def test_TitleFuncLine_Raises(self):
        test_lines = ['aa', '# aa']
        for line in test_lines:
            self.assertRaises(TypeError, TitleFuncLine, line)

    def test_TitleFuncLine_True(self):
        test_lines = [u'#+TITLE: ', '#+TITLE:a', '#+title:ab']
        for line in test_lines:
            self.assertEqual(line, str(TitleFuncLine(line)))

    def test_BeginSrcFuncLine_Raises(self):
        test_lines = ['aa', '# aa', '#+end_src', '#+Begin_Src:']
        for line in test_lines:
            self.assertRaises(TypeError, BeginSrcFuncLine, line)

    def test_BeginFuncLine_True(self):
        BeginSrcFuncLine('#+begin_src abc\n')
        test_lines = [u'#+Begin_Src ', '#+begin_src\t', '#+BEGIN_SRC python']
        for line in test_lines:
            self.assertEqual(line, str(BeginSrcFuncLine(line)))

    def test_EndSrcFuncLine_Raises(self):
        test_lines = ['aa', '# aa', '#+End_Src:']
        for line in test_lines:
            self.assertRaises(TypeError, EndSrcFuncLine, line)

    def test_EndFuncLine_True(self):
        test_lines = [u'#+End_Src', '#+end_src\t\n', '#+END_SRC\n']
        for line in test_lines:
            self.assertEqual(line, str(EndSrcFuncLine(line)))

    def test_HeadLine_Raises(self):
        test_lines = ['aa\n\n', '# aa', '#+End_Src:', '** \n\n', '* ']
        for line in test_lines:
            self.assertRaises(TypeError, HeadLine, line)

    def test_HeadLine_True(self):
        test_lines = ['* abc', '**** abc\n', u'** 1']
        for line in test_lines:
            self.assertEqual(line, str(HeadLine(line)))

    def test_TableLine_True(self):
        test_lines = ['|ax|', '\t|abc|  | ', u'  |  a  |\n']
        for line in test_lines:
            self.assertEqual(line, str(TableLine(line)))

    def test_TableLine_Raises(self):
        test_lines = ['* abc', '**** abc\n', u'** 1', u'x|ddds |', '|dd |B']
        for line in test_lines:
            self.assertRaises(TypeError, TableLine, line)

    def test_OrderLine_True(self):
        test_lines = ['\t1. 1', '212. a', u'2) ']
        for line in test_lines:
            self.assertEqual(line, str(OrderLine(line)))

    def test_OrderLine_Raises(self):
        test_lines = ['1))', '**** abc\n', u'123 )', '2']
        for line in test_lines:
            self.assertRaises(TypeError, OrderLine, line)

    def test_BulletinLine_True(self):
        test_lines = ['\t + abcde', '+ 123', u'- aa', ' * 12']
        for line in test_lines:
            self.assertEqual(line, str(BulletinLine(line)))

    def test_BulletinLine_Raises(self):
        test_lines = ['* 123', '-', u'+', ' +123']
        for line in test_lines:
            self.assertRaises(TypeError, BulletinLine, line)

    def test_DescriptionLine_True(self):
        test_lines = ['  + ab :: aa\n', '+ 123 :: aa', u' * 12 :: ab']
        for line in test_lines:
            self.assertEqual(line, str(DescriptionLine(line)))

    def test_DescriptionLine_Raises(self):
        test_lines = ['* 123', '-', u'+', ' +123', '+abc::abc',
                      '- abc::c', '  * a:: bc']
        for line in test_lines:
            self.assertRaises(TypeError, DescriptionLine, line)

    def test_Footnote_Raises(self):
        test_lines = ['+abc::abc', '- abc::c', '  * a:: bc', '[fn:]',
                      '[fn:  ]', u' [fn:12] sldjfslkfdj', '1[fn:12]']
        for line in test_lines:
            self.assertRaises(TypeError, FootNoteLine, line)

    def test_Footnote_True(self):
        test_lines = ['[fn:1]', u'[fn:奇迹]',
                      u'[fn:12] sldjfslkfdj', '[fn:abcs]']
        for line in test_lines:
            self.assertEqual(line, unicode(FootNoteLine(line)))

    def test_LinkLine_Raises(self):
        test_lines = ['[[]]', '[[][]]', '  * a:: bc', '[fn:]', '[fn:  ]',
                      u' [fn:12] sldjfslkfdj', ' [[]abc]', '[abc[]]',
                      '[[][]]', '[[][123]]', '[sdds[]]', '[[]abc]',
                      '[abc][abc]', '[abc]', '[abc[]abc]', '[[abc][abc]abc]',
                      '[abc[abc[abca]]]', '[abc[abc][abc]]']
        for line in test_lines:
            self.assertRaises(TypeError, LinkLine, line)

    def test_LinkLine_True(self):
        test_lines = ['[[ab]]', u'[[http://qiji.com][奇迹]]',
                      u'[[这么操蛋]]', '[[file:/tmp/abc.org::300]]']
        for line in test_lines:
            self.assertEqual(line, unicode(LinkLine(line)))

    def test_TodoItemLine_Raises(self):
        test_lines = ['[[]]', '[[][]]', '  * a:: bc', '[fn:]', '[fn:  ]',
                      u' [fn:12] sldjfslkfdj', ' [[]abc]', '[abc[]]']
        for line in test_lines:
            self.assertRaises(TypeError, TodoItemLine, line)

    def test_TodoItemLine_True(self):
        test_lines = ['** TODO abc', u'** TODO ', u'* TODO\n', u'*** TODO ok']
        for line in test_lines:
            self.assertEqual(line, unicode(TodoItemLine(line)))

    def test_checkBoxLine_True(self):
        test_lines = ['- [ ] abc', u'- [X]', u'- [ ]\n', u'- [x]\n',
                      u'- [X] Nice Job', u' * [x] a']
        for line in test_lines:
            self.assertEqual(line, unicode(CheckBoxLine(line)))

    def test_checkBoxLine_Raise(self):
        test_lines = ['- [ ]abc', u'+ []', u'-[ ]abc'
                      u'- [X] Nice Job', u'* [ ] a', u'  * [s] a']
        for line in test_lines:
            self.assertRaises(TypeError, CheckBoxLine, line)

    def test_TagsLine_True(self):
        test_lines = ['* abc :aa:', u'* :aa:bb:cc:', u'*** a :aa:\n',
                      u'* aa\t:aa:bb:\n', '**** :aa:bb:cccc:dd:\n']
        for line in test_lines:
            self.assertEqual(line, unicode(TagsLine(line)))

    def test_TagsLine_Raise(self):
        test_lines = ['* abcde :aa', u'abcde: aa:', u'**** abcde:aa:',
                      u'  * abc :aa:', '**** :aa:bb:cccc:dd\n']
        for line in test_lines:
            self.assertRaises(TypeError, TagsLine, line)

# orgclass_test.py ended here
