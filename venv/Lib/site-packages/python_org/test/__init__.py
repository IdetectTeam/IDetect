#!/usr/bin/env python2
# -*- coding: utf-8 -*-

# Last modified: <2012-12-11 16:08:42 Tuesday by richard>

# @version 0.2
# @author : Richard Wong
# Email: chao787@gmail.com
import inspect
import os
import codecs

_cur = os.path.realpath(os.path.abspath
                        (os.path.split
                         (inspect.getfile(inspect.currentframe()))[0]))

org_file_path = os.path.join(_cur, "testfile.org")
print org_file_path

with codecs.open(org_file_path, "rb", "utf8") as fin:
    org_test_string = fin.read()

# __init__.py ended here
