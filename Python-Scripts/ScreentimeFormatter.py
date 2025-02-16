import psycopg2
from collections import defaultdict

unproductive_apps = [
    "facebook", "instagram", "tiktok", "snapchat", "twitter", "youtube", "netflix", "hulu", "disney+", "twitch",
    "reddit", "pinterest", "tumblr", "whatsapp", "telegram", "messenger", "be_real", "clubhouse", "vimeo", "dailymotion",
    "spotify", "apple_music", "pandora", "soundcloud", "deezer", "audiomack", "amazon_prime_video", "hbo_max", "peacock",
    "paramount+", "espn", "bleacher_report", "the_chive", "9gag", "funny_or_die", "imgur", "quora", "buzzfeed", "bored_panda",
    "kickstarter", "patreon", "onlyfans", "grindr", "tinder", "bumble", "okcupid", "hinge", "match", "eharmony", "zoosk"
]

class App:
    def __init__(self, name, minutes_spent):
        self.name = name
        self.minutes_spent = minutes_spent
    
    def getMinutes():
        return self.minutes_spent
    
    def getName():
        return self.name

class Hour:
    def __init__(self, hour):
        self.hour = hour
        self.apps = []

    def add_app(self, app):
        self.apps.append(app)
    
    def getApps():
        return apps

    
def get_totals(hours_dict):
    total_time = 0
    unproductive_time = 0
    for hour in hours_dict:
        for app in hour.apps:
            total_time += app.getMinutes()
            if (app.name in unproductive_apps):
                unproductive_time += app.getMinutes()

    return total_time, unproductive_time

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

def main():
    hours_data = fetch_data_from_db()
    for hour in hours_data:
        print(hour)

if __name__ == "__main__":
    main()
