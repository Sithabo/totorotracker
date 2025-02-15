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

    def __repr__(self):
        return f"App(name='{self.name}', minutes_spent={self.minutes_spent})"

class Hour:
    def __init__(self, hour):
        self.hour = hour
        self.apps = []

    def add_app(self, app):
        self.apps.append(app)
    
    def __repr__(self):
        return f"Hour({self.hour}, apps={self.apps})"

def fetch_data_from_db():
    hours_dict = defaultdict(Hour)
    
    conn = psycopg2.connect(
        dbname="your_database",
        user="your_user",
        password="your_password",
        host="your_host",
        port="your_port"
    )
    cursor = conn.cursor()
    
    query = "SELECT hour, app_name, minutes_spent FROM app_usage;"
    cursor.execute(query)
    
    for row in cursor.fetchall():
        hour, app_name, minutes_spent = row
        if hour not in hours_dict:
            hours_dict[hour] = Hour(hour)
        hours_dict[hour].add_app(App(app_name, minutes_spent))
    
    cursor.close()
    conn.close()
    
    return list(hours_dict.values())

def main():
    hours_data = fetch_data_from_db()
    for hour in hours_data:
        print(hour)

if __name__ == "__main__":
    main()
