# coding: utf-8
from . import main
from flask import render_template, jsonify, flash, request, current_app, url_for, Response, g, abort


@main.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')
