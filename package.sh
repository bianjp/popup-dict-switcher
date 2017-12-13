#!/usr/bin/bash

rm -f popup-dict-switcher.zip
zip -r popup-dict-switcher.zip . -i metadata.json \
                                 -i \*.js \
                                 -i \*.css \
                                 -i icons/* \
                                 -i README.md \
                                 -i LICENSE
unzip -t popup-dict-switcher.zip
