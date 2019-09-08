#!/usr/bin/env python2
# coding=utf-8

# Last modified: <2012-12-11 16:01:40 Tuesday by richard>

# @version 0.1
# @author : Richard Wong
# Email: chao787@gmail.com
"""

This file contains about org format file's reader.
It is a line-oriented compiler. read all text to a data_structure.

# is a function line in org mode.
主要需要实现的功能有
1. [ ] :题目
#+TITLE
2. [ ] :其他注释参数
#
   3. [ ] :主题等级 *
4. [ ] :表
|   |   |
      |---+---|
      |   |   |
   5. [ ] :序号
6. [ ] :bulletin.

"""
from python_org.orgclass import SpaceLine
from python_org.orgclass import BasicLine
from python_org.orgclass import HeadLine
from python_org.orgclass import BasicFuncLine
from python_org.orgclass import BeginSrcFuncLine
from python_org.orgclass import EndSrcFuncLine
from python_org.orgclass import TitleFuncLine
from python_org.orgclass import TableLine
from python_org.orgclass import OrderLine
from python_org.orgclass import BulletinLine
from python_org.orgclass import DescriptionLine
from python_org.orgclass import FootNoteLine
from python_org.orgclass import LinkLine
from python_org.orgclass import TodoItemLine
from python_org.orgclass import CheckBoxLine
from python_org.orgclass import TagsLine
from python_org.orgclass import OverviewLine


def org_interpreter(line_content):
    """
    Interpret the line to specific data structure.
    """
    # Order is important.
    class_list = [SpaceLine,
                  TitleFuncLine, BeginSrcFuncLine, EndSrcFuncLine,
                  BasicFuncLine,
                  TodoItemLine, OverviewLine, TagsLine, HeadLine,
                  TableLine,
                  OrderLine,
                  CheckBoxLine, BulletinLine,
                  LinkLine,
                  DescriptionLine,
                  FootNoteLine,
                  BasicLine]
    for c_init in class_list:
        try:
            re = c_init(line_content)
            return re
        except TypeError:
            continue


def translate_org(s):
    """
    Read org mode to a structure.
    Parameter:
    - `s`: org format string.
    """
    result = []
    for line_text in s:
        result.append(org_interpreter(line_text))

    return result

# orgreader.py ended here
