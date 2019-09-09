#!/usr/bin/env python2
# coding=utf-8

# Last modified: <2012-12-11 15:32:49 Tuesday by richard>

# @version 0.1
# @author : Richard Wong
# Email: chao787@gmail.com


def is_type(re_pattern, s):
    m = re_pattern.match(s)
    if m is None or m.span() != (0, len(s)):
        return False
    return True


# org_util.py ended here
