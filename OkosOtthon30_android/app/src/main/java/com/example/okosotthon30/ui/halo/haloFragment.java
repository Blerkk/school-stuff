package com.example.okosotthon30.ui.halo;

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
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class haloFragment extends Fragment {

    FirebaseDatabase  database;
    DatabaseReference myref;

    private haloViewModel haloViewModel;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflanter, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState){
        //homersekletLekeresHalo();
        ablakLekeresHalo();


        return inflanter.inflate(R.layout.fragment_halo, container, false);
    }

    public void homersekletLekeresHalo()
    {

        myref = FirebaseDatabase.getInstance().getReference("HALO/TEMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Double haloHomerseklet = dataSnapshot.getValue(Double.class);

                TextView haloHomer = (TextView)getActivity().findViewById(R.id.homersekletTextHalo);
                haloHomer.setText(haloHomerseklet + " °C");
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void lampaAllapotLekeresHalo()
    {
        myref = FirebaseDatabase.getInstance().getReference("HALO/LAMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean lampaAllapotHalo = dataSnapshot.getValue(Boolean.class);

                ImageView haloLampaAllapot = (ImageView) getActivity().findViewById(R.id.image);
                if (lampaAllapotHalo == false) {
                    //felkapcsolas icon
                }
                else {
                    //
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void ablakLekeresHalo()
    {
        myref = FirebaseDatabase.getInstance().getReference("HALO/WINDOW");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean haloAblak = dataSnapshot.getValue(Boolean.class);

                TextView haloAblakStatus = (TextView)getActivity().findViewById(R.id.ablakAllapotHalo);

                if(haloAblak == true) {
                    haloAblakStatus.setText("Az ablak nyitva van!");
                }
                else {
                    haloAblakStatus.setText("Az ablak be van csukva!");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }
}