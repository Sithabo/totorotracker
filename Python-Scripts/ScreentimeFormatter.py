import psycopg2
import numpy as np
import random
from collections import defaultdict
from flask import Flask, jsonify

unproductive_apps = [
    "facebook", "instagram", "tiktok", "snapchat", "twitter", "youtube", "netflix", "hulu", "disney+", "twitch",
    "reddit", "pinterest", "tumblr", "whatsapp", "telegram", "messenger", "be_real", "clubhouse", "vimeo", "dailymotion",
    "spotify", "apple_music", "pandora", "soundcloud", "deezer", "audiomack", "amazon_prime video", "hbo_max", "peacock",
    "paramount+", "espn", "bleacher_report", "the chive", "9gag", "funny_or_die", "imgur", "quora", "buzzfeed", "bored_panda",
    "kickstarter", "patreon", "onlyfans", "grindr", "tinder", "bumble", "okcupid", "hinge", "match", "eharmony", "zoosk"
]

class App:
    def __init__(self, name, minutes_spent):
        self.name = name
        self.minutes_spent = minutes_spent
    
    def getMinutes(self):
        return self.minutes_spent
    
    def getName(self):
        return self.name

class Hour:
    def __init__(self, hour):
        self.hour = hour
        self.apps = []
        self.break_time = 0
        self.unproductive_time = 0
        self.total_screentime = 0

    def add_app(self, app):
        self.apps.append(app)
        self.total_screentime += app.getMinutes()
        if app.getName() in unproductive_apps:
            self.unproductive_time += app.getMinutes()
        self.break_time = 60 - self.total_screentime

    def getBT(self):
        return self.break_time

    def getUT(self):
        return self.unproductive_time
    
    def getTotal_Time(self):
        return self.total_screentime

def get_totals(hours_dict):
    daily_screentime = 0
    daily_unproductive_time = 0
    daily_break_time  = 0
    time = 0
    late_screentime = 0
    for hour in hours_dict:
        daily_screentime += hour.getTotal_Time()
        daily_unproductive_time += hour.getUT()
        daily_break_time  += hour.getBT()
        if time >= 22:
            late_screentime += hour.getTotal_Time()
        time += 1
    daily_productive_time = daily_screentime - daily_unproductive_time

    return late_screentime, daily_productive_time, daily_unproductive_time, daily_break_time

def calculate_screen_time_score(
    user_screen_time_before_bed,  # User's screen time before bed (in hours)
    user_productive_time,         # User's productive time (in hours)
    user_unproductive_time,       # User's unproductive time (in hours)
    user_break_time,              # User's break time (in hours)
    ideal_screen_time_before_bed, # Ideal screen time before bed (in hours)
    ideal_productive_time,        # Ideal productive time (in hours)
    ideal_unproductive_time,      # Ideal unproductive time (in hours)
    ideal_break_time              # Ideal break time (in hours)
):
    # Convert all time values to percentages of a 24-hour day
    total_hours_in_day = 24

    # User's percentages
    user_screen_time_before_bed_pct = (user_screen_time_before_bed / total_hours_in_day) * 100
    user_productive_time_pct = (user_productive_time / total_hours_in_day) * 100
    user_unproductive_time_pct = (user_unproductive_time / total_hours_in_day) * 100
    user_break_time_pct = (user_break_time / total_hours_in_day) * 100

    # Ideal percentages
    ideal_screen_time_before_bed_pct = (ideal_screen_time_before_bed / total_hours_in_day) * 100
    ideal_productive_time_pct = (ideal_productive_time / total_hours_in_day) * 100
    ideal_unproductive_time_pct = (ideal_unproductive_time / total_hours_in_day) * 100
    ideal_break_time_pct = (ideal_break_time / total_hours_in_day) * 100

    # Create numpy arrays for user and ideal percentages
    user_vector = np.array([
        user_screen_time_before_bed_pct,
        user_productive_time_pct,
        user_unproductive_time_pct,
        user_break_time_pct
    ])

    ideal_vector = np.array([
        ideal_screen_time_before_bed_pct,
        ideal_productive_time_pct,
        ideal_unproductive_time_pct,
        ideal_break_time_pct
    ])

    # Calculate Euclidean distance between user and ideal vectors
    distance = np.linalg.norm(user_vector - ideal_vector)

    # Normalize the distance to a percentage score
    # Assume the maximum possible distance is the distance between the ideal vector and a worst-case vector
    # Worst-case vector: [100, 0, 0, 0] (all time spent on screen before bed)
    worst_case_vector = np.array([100, 0, 0, 0])
    max_distance = np.linalg.norm(ideal_vector - worst_case_vector)

    # Calculate the score as a percentage
    score = 100 * (1 - (distance / max_distance))

    # Ensure the score is within 0–100
    score = max(0, min(100, score))

    return score





app = Flask(__name__)
@app.route('/get_integer')

def get_integer():
    return jsonify({"value": 42})  # Sending an integer in JSON format




def fetch_data_from_db():
    hours_dict = defaultdict(Hour)
    
    conn = psycopg2.connect(
        dbname="totorodb",
        user="postgres",
        password="postgres",
        host="127.0.0.1",
        port="5432"
    )
    cursor = conn.cursor()
    
    query = "SELECT hour, app_id, time_spent FROM app_usages;"
    cursor.execute(query)
    
    for row in cursor.fetchall():
        hour, app_name, time_spent = row
        if hour not in hours_dict:
            hours_dict[hour] = Hour(hour)
        hours_dict[hour].add_app(App(app_name, time_spent))
    
    cursor.close()
    conn.close()
    
    return list(hours_dict.values())

def test_data():
    hours_list = []

    # Populate the list with Hour instances and App instances
    for hour in range(24):
        hour_instance = Hour(hour)
        remaining_minutes = random.randint(0,60)

        # Randomly select apps and their usage time
        while remaining_minutes > 0:
            app_name = random.choice(unproductive_apps)
            minutes_spent = random.randint(1, remaining_minutes)
            app_instance = App(app_name, minutes_spent)
            hour_instance.add_app(app_instance)
            remaining_minutes -= minutes_spent

        hours_list.append(hour_instance)

    # Print the details for each hour
    for hour_instance in hours_list:
        print(f"Hour {hour_instance.hour}:")
        print(f"  Total Screen Time: {hour_instance.getTotal_Time()} minutes")
        print(f"  Unproductive Time: {hour_instance.getUT()} minutes")
        print(f"  Break Time: {hour_instance.getBT()} minutes")
        print("  Apps:")
        for app in hour_instance.apps:
            print(f"    {app.getName()}: {app.getMinutes()} minutes")
        print()
    return hours_list

def main():
    #hours_data = fetch_data_from_db()
    #for hour in hours_data:
    #    print(hour.getApps())
    user_screen_time_before_bed, user_productive_time, user_unproductive_time, user_break_time = get_totals(test_data())          

    ideal_screen_time_before_bed = 0   # 0 hours (no screen time before bed)
    ideal_productive_time = 300          # 5 hours
    ideal_unproductive_time = 60        # 2 hours
    ideal_break_time = 120               # 3 hours

    score = calculate_screen_time_score(
        user_screen_time_before_bed,
        user_productive_time,
        user_unproductive_time,
        user_break_time,
        ideal_screen_time_before_bed,
        ideal_productive_time,
        ideal_unproductive_time,
        ideal_break_time
    )
    print(get_totals(test_data()))
    print(f"Screen Time Score: {score:.2f}%")
if __name__ == "__main__":
    main()
