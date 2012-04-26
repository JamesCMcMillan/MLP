package com.jcmcmillan.MLPong;

import android.os.Bundle;
import com.phonegap.*;

public class App extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	super.setIntegerProperty("loadUrlTimeoutValue", 60000);
    	super.onCreate(savedInstanceState);
    	super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/html/index.html");
    }
}