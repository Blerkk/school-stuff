package com.example.okosotthon30.ui.nappali;

import android.graphics.drawable.TransitionDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import com.example.okosotthon30.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import androidx.annotation.DrawableRes;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.google.android.material.tabs.TabLayout;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class nappaliFragment extends Fragment {

    FirebaseDatabase  database;
    DatabaseReference myref;

    private nappaliViewModel nappaliViewModel;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflanter, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState){
        //homersekletLekeresNappali();
        ablakLekeresNappali();

        return inflanter.inflate(R.layout.fragment_nappali, container, false);
    }

    public void lampaAllapotLekeresNappali()
    {
        myref = FirebaseDatabase.getInstance().getReference("NAPPALI/LAMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean lampaAllapotNappali = dataSnapshot.getValue(Boolean.class);

                ImageView nappaliLampaAllapot = (ImageView) getActivity().findViewById(R.id.image);

                if (lampaAllapotNappali == true) {
                    //felkapcsolas icon
                } else {
                    //
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void homersekletLekeresNappali()
    {
        myref = FirebaseDatabase.getInstance().getReference("NAPPALI/TEMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Double nappaliHomerseklet = dataSnapshot.getValue(Double.class);

                TextView nappaliHomer = (TextView)getActivity().findViewById(R.id.homersekletTextNappali);
                nappaliHomer.setText(nappaliHomerseklet + " °C");
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void ablakLekeresNappali()
    {
        myref = FirebaseDatabase.getInstance().getReference("NAPPALI/WINDOW");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean nappaliAblak = dataSnapshot.getValue(Boolean.class);

                TextView nappaliAblakStatus = (TextView)getActivity().findViewById(R.id.ablakAllapotNappali);

                if(nappaliAblak == true) {
                    nappaliAblakStatus.setText("Az ablak nyitva van!");
                }
                else {
                    nappaliAblakStatus.setText("Az ablak be van csukva!");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }
}