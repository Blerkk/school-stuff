package com.example.okosotthon30;

import android.graphics.drawable.TransitionDrawable;
import android.os.Bundle;

import com.example.okosotthon30.ui.etkezo.etkezoFragment;
import com.example.okosotthon30.ui.furdo.furdoFragment;
import com.example.okosotthon30.ui.halo.haloFragment;
import com.example.okosotthon30.ui.nappali.nappaliFragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.ToggleButton;

import com.google.android.material.tabs.TabLayout;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class MainActivity extends AppCompatActivity
{
    FirebaseDatabase  database;
    DatabaseReference myref;

    FragmentManager manager;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        manager = getSupportFragmentManager();

        database = FirebaseDatabase.getInstance();
        myref = database.getReference();

        BottomNavigationView bottomNav = findViewById(R.id.navigation_view);
        bottomNav.setOnNavigationItemSelectedListener(navListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.nav_host_fragment,
                new nappaliFragment()).commit();
    }

    private BottomNavigationView.OnNavigationItemSelectedListener navListener =
            new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                    Fragment selectedFragment = null;

                    switch(item.getItemId()){
                        case R.id.navigation_nappali:
                            selectedFragment = new nappaliFragment();
                            break;
                        case R.id.navigation_etkezo:
                            selectedFragment = new etkezoFragment();
                            break;
                        case R.id.navigation_halo:
                            selectedFragment = new haloFragment();
                            break;
                        case R.id.navigation_furdo:
                            selectedFragment = new furdoFragment();
                            break;
                    }

                    getSupportFragmentManager().beginTransaction().replace(R.id.container,
                            selectedFragment).commit();

                    return true;
                }
            };

    public void nappaliLampaKapcsolo(View view)
    {
        final ImageView image = (ImageView) findViewById(R.id.imageNappali);
        final ToggleButton button = (ToggleButton) findViewById(R.id.lampakapcsoloNappali);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TransitionDrawable drawable = (TransitionDrawable) image
                        .getDrawable();
                if(button.isChecked()){
                    drawable.startTransition(500);
                    myref.child("NAPPALI").child("LAMP").setValue(true);
                }
                else{
                    drawable.reverseTransition(500);
                    myref.child("NAPPALI").child("LAMP").setValue(false);
                }

            }
        });
    }

    public void etkezoLampaKapcsolo(View view)
    {
        final ImageView image = (ImageView) findViewById(R.id.imageEtkezo);
        final ToggleButton button = (ToggleButton) findViewById(R.id.lampakapcsoloEtkezo);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TransitionDrawable drawable = (TransitionDrawable) image
                        .getDrawable();
                if(button.isChecked()){
                    drawable.startTransition(500);
                    myref.child("ETKEZO").child("LAMP").setValue(true);
                }
                else{
                    drawable.reverseTransition(500);
                    myref.child("ETKEZO").child("LAMP").setValue(false);
                }

            }
        });
    }

    public void haloLampaKapcsolo(View view)
    {
        final ImageView image = (ImageView) findViewById(R.id.imageHalo);
        final ToggleButton button = (ToggleButton) findViewById(R.id.lampakapcsoloHalo);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TransitionDrawable drawable = (TransitionDrawable) image
                        .getDrawable();
                if(button.isChecked()){
                    drawable.startTransition(500);
                    myref.child("HALO").child("LAMP").setValue(true);
                }
                else{
                    drawable.reverseTransition(500);
                    myref.child("HALO").child("LAMP").setValue(false);
                }

            }
        });
    }

    public void furdoLampaKapcsolo(View view)
    {
        final ImageView image = (ImageView) findViewById(R.id.imageFurdo);
        final ToggleButton button = (ToggleButton) findViewById(R.id.lampakapcsoloFurdo);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TransitionDrawable drawable = (TransitionDrawable) image
                        .getDrawable();
                if(button.isChecked()){
                    drawable.startTransition(500);
                    myref.child("FURDO").child("LAMP").setValue(true);
                }
                else{
                    drawable.reverseTransition(500);
                    myref.child("FURDO").child("LAMP").setValue(false);
                }

            }
        });
    }
}
