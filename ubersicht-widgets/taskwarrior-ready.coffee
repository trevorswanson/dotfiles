# Author: Marek Kowalczyk <mko1971@gmail.com>, based on Upcoming-iCal-Events by Connor Beardsmore <connor.beardsmore@gmail.com>
# Last Modified: 2020-04-14

# Bash command to pull events from Taskwarrior
# Set filter and limit to adjust what and how many tasks you want to see 
# Takswarrior has more functionality that can be used here   
# https://taskwarrior.org/

# Three styles of presenting tasks: a) numbered 1-5, b) task IDs (not pretty yet, need to right-justify task IDs), c) dashes

#command: "/opt/homebrew/bin/task ready limit:5 | awk 'NR>3 && NR<9 {$1=NR-3; print $0}'"
command: "/opt/homebrew/bin/task ready limit:5 | awk 'NR>3 && NR<9'"
#command: "/opt/homebrew/bin/task ready limit:5 | awk 'NR>3 && NR<9 {$1=\"–\"; print $0}'"

# Update frequency
refreshFrequency: "15min"

# CSS styling
style: """
    top: 275px
    left: 35px;
    color: black
    font-family: 'roboto mono', monospace
    background-color rgba(black, 0.5)
    padding 15px
    border-radius 5px

    div
        display: block
        color rgba(white, 0.5)
        font-size: 14px
        font-weight: 500
        line-height: 2
        text-align left

    #subhead
        font-weight: bold
        color: rgba(white, 0.5)
        font-size 16px
        border-bottom solid 1px clear
        padding-top 6px
        padding-bottom 3px
"""

# Initial render for heading
render: (output) -> """
"""

# Update when refresh occurs
update: (output, domEl) ->
    lines = output.split('\n')
    dom = $(domEl)
    
    dom.empty()
    dom.append("""<div id="subhead"> Focus On:</div>""")

    # Go over all events and append data into the DOM
    for i in [0...lines.length-1]
            name = lines[i]

            # Characters after this value will be replaced with … 
            MAX_CHARACTERS = 50


            if ( name.length > MAX_CHARACTERS )
                name = name.substr(0, MAX_CHARACTERS) + "…"

            # Add this HTML to previous
            dom.append("""<div>#{name}</div>""")