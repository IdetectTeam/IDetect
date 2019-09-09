#!/usr/bin/env python2
# coding=utf-8

# Last modified: <2012-12-11 16:08:24 Tuesday by richard>

# @version 0.1
# @author : Richard Wong
# Email: chao787@gmail.com
import unittest
from python_org.orgreader import org_interpreter
from python_org.orgreader import translate_org

from python_org.orgclass import SpaceLine
from python_org.orgclass import BasicLine
from python_org.orgclass import HeadLine
from python_org.orgclass import BasicFuncLine
from python_org.orgclass import EndSrcFuncLine
from python_org.orgclass import BeginSrcFuncLine
from python_org.orgclass import TitleFuncLine
from python_org.orgclass import TableLine
from python_org.orgclass import OrderLine
from python_org.orgclass import BulletinLine
from python_org.test import org_test_string


class OrgReaderTestCase(unittest.TestCase):

    # Only use setUp() and tearDown() if necessary
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_org_interpreter(self):
        l = "#+TITLE: line\n"
        self.assertIsInstance(org_interpreter(l), TitleFuncLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_src_begin(self):
        l = "#+begin_src python"
        self.assertIsInstance(org_interpreter(l), BeginSrcFuncLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_src_end(self):
        l = "#+end_src"
        self.assertIsInstance(org_interpreter(l), EndSrcFuncLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter2(self):
        l = "# coddl\n"
        self.assertIsInstance(org_interpreter(l), BasicFuncLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter3(self):
        l = "coddl\n"
        self.assertIsInstance(org_interpreter(l), BasicLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter4(self):
        l = "*** coddl\n"
        self.assertIsInstance(org_interpreter(l), HeadLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_table_line(self):
        l = "|\n"
        self.assertIsInstance(org_interpreter(l), BasicLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_table_line2(self):
        l = "|123|123|\n"
        self.assertIsInstance(org_interpreter(l), TableLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_table_line3(self):
        l = "   |123|123|123|\n"
        self.assertIsInstance(org_interpreter(l), TableLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_bulletin_line(self):
        l = " * coddl\n"
        self.assertIsInstance(org_interpreter(l), BulletinLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_bulletin_line2(self):
        l = " * \n"
        self.assertIsInstance(org_interpreter(l), BulletinLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_order_line(self):
        l = " 1. coddl\n"
        self.assertIsInstance(org_interpreter(l), OrderLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_order_line2(self):
        l = "1. coddl\n"
        self.assertIsInstance(org_interpreter(l), OrderLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_space_line(self):
        l = "    "
        self.assertIsInstance(org_interpreter(l), SpaceLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_space_line2(self):
        l = ""
        self.assertIsInstance(org_interpreter(l), SpaceLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_interpreter_space_line3(self):
        l = "\n"
        self.assertIsInstance(org_interpreter(l), SpaceLine)
        self.assertEqual(l, str(org_interpreter(l)))

    def test_org_translate(self):
        translate_org(org_test_string)

if __name__ == '__main__':
    unittest.main()

# test_orgreader.py ended here
